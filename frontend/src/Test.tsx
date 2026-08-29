// Target location: frontend/src/Test.tsx
//
// Throwaway harness to exercise GET/POST/POST-claim on the food-protocol
// endpoints before wiring real UI. Point main.tsx at this instead of
// <App />, confirm all three actions work for a kitchen and an ngo
// session, then delete this file and switch main.tsx back.

import { useEffect, useState, type CSSProperties, type ChangeEvent, type FormEvent } from 'react';
import { useFoodStore, type CreateFoodProtocolPayload } from './store/useFoodStore'; // adjust if you saved it as useFoodStore.ts
import { useAuthStore, type RegisterInstitutionPayload, type InstitutionType } from './store/useAuthStore'; // adjust path if yours differs

const emptyRegForm: RegisterInstitutionPayload = {
  type: 'kitchen',
  organizationName: '',
  location: '',
  capacityValue: 0,
  contactPhone: '',
  contactName: '',
  contactEmail: '',
};

const emptyForm: CreateFoodProtocolPayload = {
  dish: '',
  quantity: '',
  perishability: '',
  badgeClass: '',
  coolingRule: '',
  segregationAlert: false,
  safeWindow: '',
  targetTemp: '',
  vessel: '',
};

export default function Test() {
  const { authInstitution, checkAuth, isCheckingAuth, registerInstitution, isRegistering, logout } = useAuthStore();
  const {
    listings,
    isLoadingListings,
    isCreating,
    claimingId,
    error,
    getFoodProtocols,
    createFoodProtocol,
    claimFoodProtocol,
  } = useFoodStore();

  const [form, setForm] = useState<CreateFoodProtocolPayload>(emptyForm);
  const [claimId, setClaimId] = useState('');
  const [log, setLog] = useState<string[]>([]);
  const [regForm, setRegForm] = useState<RegisterInstitutionPayload>(emptyRegForm);

  useEffect(() => {
    checkAuth();
    getFoodProtocols();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const pushLog = (line: string) =>
    setLog((prev) => [`${new Date().toLocaleTimeString()}  ${line}`, ...prev].slice(0, 20));

  const handleField =
    (key: keyof CreateFoodProtocolPayload) => (e: ChangeEvent<HTMLInputElement>) =>
      setForm((prev) => ({
        ...prev,
        [key]: e.target.type === 'checkbox' ? e.target.checked : e.target.value,
      }));

  const handleRegField =
    (key: keyof RegisterInstitutionPayload) => (e: ChangeEvent<HTMLInputElement>) =>
      setRegForm((prev) => ({
        ...prev,
        [key]: key === 'capacityValue' ? Number(e.target.value) : e.target.value,
      }));

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
    const result = await registerInstitution(regForm);
    pushLog(
      result.success
        ? `REGISTER ok — ${result.data.organizationName} as ${result.data.type}`
        : `REGISTER failed — ${result.error}`
    );
    if (result.success) setRegForm(emptyRegForm);
  };

  const handleLogout = () => {
    logout();
    pushLog('Logged out (client-side only)');
  };

  const handleCreate = async (e: FormEvent) => {
    e.preventDefault();
    const result = await createFoodProtocol(form);
    pushLog(result.success ? `CREATE ok — id ${result.data.id}` : `CREATE failed — ${result.error}`);
    if (result.success) setForm(emptyForm);
  };

  const handleClaimById = async (e: FormEvent) => {
    e.preventDefault();
    if (!claimId) return;
    const result = await claimFoodProtocol(claimId);
    pushLog(
      result.success
        ? `CLAIM ok — id ${result.data.id} now ${result.data.status}`
        : `CLAIM failed — ${result.error}`
    );
  };

  const handleClaimRow = async (id: string) => {
    const result = await claimFoodProtocol(id);
    pushLog(
      result.success
        ? `CLAIM ok — id ${result.data.id} now ${result.data.status}`
        : `CLAIM failed — ${result.error}`
    );
  };

  const handleRefresh = async () => {
    await getFoodProtocols();
    pushLog('GET listings refreshed');
  };

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <div style={styles.sectionHeader}>
          <h1 style={styles.h1}>Food Protocol — endpoint harness</h1>
          {authInstitution && (
            <button style={styles.buttonSmall} onClick={handleLogout}>
              Log out (client-side)
            </button>
          )}
        </div>
        <p style={styles.sub}>
          {isCheckingAuth
            ? 'Checking session…'
            : authInstitution
            ? `Logged in as ${authInstitution.organizationName} (${authInstitution.type})`
            : 'Not logged in — register below as a kitchen or an ngo to get a session cookie.'}
        </p>
      </header>

      {error && <div style={styles.error}>Last error: {error}</div>}

      <section style={styles.section}>
        <h2 style={styles.h2}>POST /institutions — register</h2>
        <form onSubmit={handleRegister} style={styles.form}>
          <select
            style={styles.input}
            value={regForm.type}
            onChange={(e) =>
              setRegForm((prev) => ({ ...prev, type: e.target.value as InstitutionType }))
            }
          >
            <option value="kitchen">kitchen</option>
            <option value="ngo">ngo</option>
          </select>
          <input
            style={styles.input}
            placeholder="organizationName"
            value={regForm.organizationName}
            onChange={handleRegField('organizationName')}
            required
          />
          <input
            style={styles.input}
            placeholder="location"
            value={regForm.location}
            onChange={handleRegField('location')}
            required
          />
          <input
            style={styles.input}
            placeholder="capacityValue"
            type="number"
            value={regForm.capacityValue}
            onChange={handleRegField('capacityValue')}
            required
          />
          <input
            style={styles.input}
            placeholder="contactPhone"
            value={regForm.contactPhone}
            onChange={handleRegField('contactPhone')}
            required
          />
          <input
            style={styles.input}
            placeholder="contactName (optional)"
            value={regForm.contactName}
            onChange={handleRegField('contactName')}
          />
          <input
            style={styles.input}
            placeholder="contactEmail (optional)"
            value={regForm.contactEmail}
            onChange={handleRegField('contactEmail')}
          />
          <button style={styles.button} type="submit" disabled={isRegistering}>
            {isRegistering ? 'Registering…' : `Register as ${regForm.type}`}
          </button>
        </form>
      </section>

      <section style={styles.section}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.h2}>GET /food-protocols</h2>
          <button style={styles.button} onClick={handleRefresh} disabled={isLoadingListings}>
            {isLoadingListings ? 'Loading…' : 'Refresh listings'}
          </button>
        </div>
        <div style={styles.listingsBox}>
          {listings.length === 0 && !isLoadingListings && <p style={styles.muted}>No listings yet.</p>}
          {listings.map((l) => (
            <div key={l.id} style={styles.listingRow}>
              <div>
                <strong>{l.dish}</strong> — {l.quantity} · {l.status}
                <div style={styles.muted}>
                  {l.kitchenName} · {l.kitchenLocation} · id: {l.id}
                </div>
              </div>
              <button
                style={styles.buttonSmall}
                disabled={l.status !== 'available' || claimingId === l.id}
                onClick={() => handleClaimRow(l.id)}
              >
                {claimingId === l.id ? 'Claiming…' : 'Claim'}
              </button>
            </div>
          ))}
        </div>
      </section>

      <section style={styles.section}>
        <h2 style={styles.h2}>POST /food-protocols (kitchen only)</h2>
        <form onSubmit={handleCreate} style={styles.form}>
          <input style={styles.input} placeholder="dish" value={form.dish} onChange={handleField('dish')} required />
          <input
            style={styles.input}
            placeholder="quantity"
            value={form.quantity as string}
            onChange={handleField('quantity')}
            required
          />
          <input
            style={styles.input}
            placeholder="perishability"
            value={form.perishability}
            onChange={handleField('perishability')}
            required
          />
          <input style={styles.input} placeholder="badgeClass" value={form.badgeClass} onChange={handleField('badgeClass')} />
          <input style={styles.input} placeholder="coolingRule" value={form.coolingRule} onChange={handleField('coolingRule')} />
          <input style={styles.input} placeholder="safeWindow" value={form.safeWindow} onChange={handleField('safeWindow')} />
          <input
            style={styles.input}
            placeholder="targetTemp"
            value={form.targetTemp as string}
            onChange={handleField('targetTemp')}
          />
          <input style={styles.input} placeholder="vessel" value={form.vessel} onChange={handleField('vessel')} />
          <label style={styles.checkboxLabel}>
            <input type="checkbox" checked={form.segregationAlert} onChange={handleField('segregationAlert')} />
            segregationAlert
          </label>
          <button style={styles.button} type="submit" disabled={isCreating}>
            {isCreating ? 'Creating…' : 'Create listing'}
          </button>
        </form>
      </section>

      <section style={styles.section}>
        <h2 style={styles.h2}>POST /food-protocols/:id/claim (ngo only)</h2>
        <form onSubmit={handleClaimById} style={styles.form}>
          <input
            style={styles.input}
            placeholder="listing id"
            value={claimId}
            onChange={(e) => setClaimId(e.target.value)}
          />
          <button style={styles.button} type="submit" disabled={!claimId || !!claimingId}>
            {claimingId ? 'Claiming…' : 'Claim by id'}
          </button>
        </form>
      </section>

      <section style={styles.section}>
        <h2 style={styles.h2}>Activity log</h2>
        <div style={styles.log}>
          {log.length === 0 && <p style={styles.muted}>Nothing yet.</p>}
          {log.map((line, i) => (
            <div key={i} style={styles.logLine}>
              {line}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

const styles: Record<string, CSSProperties> = {
  page: {
    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
    maxWidth: 720,
    margin: '0 auto',
    padding: '32px 20px',
    color: '#1a1a1a',
  },
  header: { marginBottom: 24, borderBottom: '1px solid #ddd', paddingBottom: 16 },
  h1: { fontSize: 20, margin: 0 },
  sub: { fontSize: 13, color: '#555', marginTop: 6 },
  error: { background: '#fdecea', color: '#611a15', padding: '8px 12px', borderRadius: 4, fontSize: 13, marginBottom: 16 },
  section: { marginBottom: 28 },
  sectionHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  h2: { fontSize: 14, textTransform: 'uppercase', letterSpacing: 0.5, color: '#333', margin: '0 0 12px' },
  listingsBox: { border: '1px solid #e2e2e2', borderRadius: 6, padding: 12, minHeight: 40 },
  listingRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '8px 0',
    borderBottom: '1px solid #f0f0f0',
    fontSize: 13,
  },
  muted: { color: '#999', fontSize: 12 },
  form: { display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' },
  input: { flex: '1 1 140px', padding: '6px 8px', border: '1px solid #ccc', borderRadius: 4, fontSize: 13 },
  checkboxLabel: { display: 'flex', alignItems: 'center', gap: 6, fontSize: 13 },
  button: { padding: '6px 14px', border: 'none', borderRadius: 4, background: '#1a1a1a', color: '#fff', fontSize: 13, cursor: 'pointer' },
  buttonSmall: { padding: '4px 10px', border: 'none', borderRadius: 4, background: '#1a1a1a', color: '#fff', fontSize: 12, cursor: 'pointer' },
  log: { border: '1px solid #e2e2e2', borderRadius: 6, padding: 12, maxHeight: 160, overflowY: 'auto', fontSize: 12 },
  logLine: { padding: '2px 0', color: '#333' },
};