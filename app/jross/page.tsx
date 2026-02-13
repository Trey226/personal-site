'use client';

import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import './dashboard.css';

const MONTH_ABBR = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.'];

function formatDate(value: unknown): string {
  if (typeof value !== 'string' || !value) return '—';
  const d = new Date(value);
  if (isNaN(d.getTime())) return String(value);

  const day = d.getDate();
  const suffix = [11, 12, 13].includes(day) ? 'th'
    : day % 10 === 1 ? 'st'
    : day % 10 === 2 ? 'nd'
    : day % 10 === 3 ? 'rd' : 'th';

  let h = d.getHours();
  const min = d.getMinutes();
  const ampm = h >= 12 ? 'pm' : 'am';
  h = h % 12 || 12;
  const time = min === 0 ? `${h}${ampm}` : `${h}:${min.toString().padStart(2, '0')}${ampm}`;

  return `${MONTH_ABBR[d.getMonth()]} ${day}${suffix} ${time}`;
}

const HEADER_MAP: Record<string, string> = {
  id: 'ID', title: 'Title', category_id: 'Category', start_time: 'Start Time',
  location: 'Location', is_published: 'Published', email: 'Email',
  first_name: 'First Name', last_name: 'Last Name', membership_tier_id: 'Tier',
  status: 'Status', joined_at: 'Joined', created_at: 'Created',
  event_id: 'Event', user_id: 'Member', amount_paid: 'Amount Paid',
  member: 'Member', event: 'Event', event_date: 'Event Date',
  amount_owed: 'Amount Owed', registered: 'Registered',
};

function formatColumnHeader(col: string): string {
  return HEADER_MAP[col] || col.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}

interface Category {
  id: string;
  name: string;
}

interface Tier {
  id: string;
  name: string;
}

export default function JrossDashboard() {
  const [activeTile, setActiveTile] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [tiers, setTiers] = useState<Tier[]>([]);

  // Event form
  const [eventTitle, setEventTitle] = useState('');
  const [eventStart, setEventStart] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [eventCategory, setEventCategory] = useState('');
  const [eventPublished, setEventPublished] = useState(false);
  const [eventPrices, setEventPrices] = useState<Record<string, string>>({});
  const [eventLoading, setEventLoading] = useState(false);
  const [eventMsg, setEventMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Member form
  const [memberEmail, setMemberEmail] = useState('');
  const [memberFirst, setMemberFirst] = useState('');
  const [memberLast, setMemberLast] = useState('');
  const [memberStatus, setMemberStatus] = useState('active');
  const [memberTier, setMemberTier] = useState('');
  const [memberLoading, setMemberLoading] = useState(false);
  const [memberMsg, setMemberMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Search — table is derived from activeTile
  const searchTable = activeTile === 'search-events' ? 'events' as const
    : activeTile === 'search-members' ? 'members' as const
    : null;
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Record<string, unknown>[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchMsg, setSearchMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Filters — members
  const [filterTier, setFilterTier] = useState('');
  const [filterMemberStatus, setFilterMemberStatus] = useState('');
  // Filters — events
  const [filterCategory, setFilterCategory] = useState('');
  const [filterPublished, setFilterPublished] = useState('');
  const [filterTime, setFilterTime] = useState('');

  // Invoices
  const [invoices, setInvoices] = useState<Record<string, unknown>[]>([]);
  const [invoicesLoading, setInvoicesLoading] = useState(false);

  // Modal
  const [modalRow, setModalRow] = useState<Record<string, unknown> | null>(null);
  const [modalDetail, setModalDetail] = useState<Record<string, unknown> | null>(null);
  const [modalTable, setModalTable] = useState<'events' | 'members'>('events');
  const [modalLoading, setModalLoading] = useState(false);

  function openTile(tile: string | null) {
    setFilterTier('');
    setFilterMemberStatus('');
    setFilterCategory('');
    setFilterPublished('');
    setFilterTime('');
    setSearchQuery('');
    setSearchResults([]);
    setActiveTile(tile);
  }

  async function loadInvoices() {
    setInvoicesLoading(true);
    const { data, error } = await supabase
      .from('registrations')
      .select('id, amount_paid, created_at, events(title, start_time), members(first_name, last_name, email)')
      .eq('status', 'unpaid');

    if (error) { setInvoicesLoading(false); return; }

    const rows = ((data || []) as Record<string, unknown>[]).map(r => {
      const ev = r.events as Record<string, unknown>;
      const mem = r.members as Record<string, unknown>;
      return {
        _id: r.id,
        member: `${mem?.first_name || ''} ${mem?.last_name || ''}`.trim() || String(mem?.email),
        email: String(mem?.email),
        event: String(ev?.title),
        event_date: formatDate(ev?.start_time),
        amount_owed: `$${Number(r.amount_paid).toFixed(2)}`,
        registered: formatDate(r.created_at),
      };
    });

    setInvoices(rows);
    setInvoicesLoading(false);
  }

  // Load dropdown data on mount
  useEffect(() => {
    async function loadDropdowns() {
      const [catRes, tierRes] = await Promise.all([
        supabase.from('event_categories').select('id, name'),
        supabase.from('membership_tiers').select('id, name'),
      ]);
      if (catRes.data) setCategories(catRes.data);
      if (tierRes.data) setTiers(tierRes.data);
    }
    loadDropdowns();
  }, []);

  // Create event + price rules
  async function handleCreateEvent(e: React.FormEvent) {
    e.preventDefault();
    setEventLoading(true);
    setEventMsg(null);

    const payload: Record<string, unknown> = {
      title: eventTitle,
      start_time: eventStart,
      location: eventLocation || null,
      is_published: eventPublished,
    };
    if (eventCategory) payload.category_id = eventCategory;

    const { data: eventRow, error } = await supabase
      .from('events').insert(payload).select('id').single();

    if (error) {
      setEventMsg({ type: 'error', text: error.message });
      setEventLoading(false);
      return;
    }

    // Insert price rules for tiers that have a price set
    const priceRules = Object.entries(eventPrices)
      .filter(([, val]) => val !== '' && !isNaN(parseFloat(val)))
      .map(([tierId, val]) => ({
        event_id: eventRow.id,
        target_tier_id: parseInt(tierId),
        price: parseFloat(val),
        name: `${tiers.find(t => String(t.id) === tierId)?.name || ''} Rate`,
      }));

    if (priceRules.length > 0) {
      const { error: priceErr } = await supabase.from('price_rules').insert(priceRules);
      if (priceErr) {
        setEventMsg({ type: 'error', text: `Event created but pricing failed: ${priceErr.message}` });
        setEventLoading(false);
        return;
      }
    }

    setEventMsg({ type: 'success', text: 'Event created successfully.' });
    setEventTitle('');
    setEventStart('');
    setEventLocation('');
    setEventCategory('');
    setEventPublished(false);
    setEventPrices({});
    setEventLoading(false);
  }

  // Add member
  async function handleAddMember(e: React.FormEvent) {
    e.preventDefault();
    setMemberLoading(true);
    setMemberMsg(null);

    const payload: Record<string, unknown> = {
      email: memberEmail,
      first_name: memberFirst || null,
      last_name: memberLast || null,
      status: memberStatus,
    };
    if (memberTier) payload.membership_tier_id = memberTier;

    const { error } = await supabase.from('members').insert(payload);

    if (error) {
      setMemberMsg({ type: 'error', text: error.message });
    } else {
      setMemberMsg({ type: 'success', text: 'Member added successfully.' });
      setMemberEmail('');
      setMemberFirst('');
      setMemberLast('');
      setMemberStatus('active');
      setMemberTier('');
    }
    setMemberLoading(false);
  }

  // Search records
  async function handleSearch() {
    if (!searchTable) return;
    setSearchLoading(true);
    setSearchMsg(null);
    setSearchResults([]);

    const q = searchQuery.trim().toLowerCase();

    // Build query with filters
    let query = supabase.from(searchTable).select('*');

    if (searchTable === 'members') {
      if (filterTier) query = query.eq('membership_tier_id', filterTier);
      if (filterMemberStatus) query = query.eq('status', filterMemberStatus);
    }

    if (searchTable === 'events') {
      if (filterCategory) query = query.eq('category_id', filterCategory);
      if (filterPublished === 'yes') query = query.eq('is_published', true);
      if (filterPublished === 'no') query = query.eq('is_published', false);
      if (filterTime === 'upcoming') query = query.gte('start_time', new Date().toISOString());
      if (filterTime === 'past') query = query.lt('start_time', new Date().toISOString());
    }

    const { data, error } = await query;

    if (error) {
      setSearchMsg({ type: 'error', text: error.message || JSON.stringify(error) });
      setSearchLoading(false);
      return;
    }

    let rows = (data || []) as Record<string, unknown>[];

    // Client-side filter if there's a query
    if (q) {
      rows = rows.filter((row) => {
        // Search through all string values in the row (and nested objects)
        return Object.values(row).some((val) => {
          if (typeof val === 'string') return val.toLowerCase().includes(q);
          if (val && typeof val === 'object') {
            return Object.values(val as Record<string, unknown>).some(
              (v) => typeof v === 'string' && v.toLowerCase().includes(q)
            );
          }
          return false;
        });
      });
    }

    // Transform rows for display: resolve IDs to names, format dates
    const catMap = new Map(categories.map(c => [String(c.id), c.name]));
    const tierMap = new Map(tiers.map(t => [String(t.id), t.name]));

    rows = rows.map(row => {
      const out = { ...row };

      if (searchTable === 'events') {
        if (out.category_id != null) out.category_id = catMap.get(String(out.category_id)) ?? out.category_id;
        out.start_time = formatDate(out.start_time);
      }

      if (searchTable === 'members') {
        // Reorder columns: First Name, Last Name, Email, Tier, Status, Joined
        return {
          _id: out.id,
          first_name: out.first_name,
          last_name: out.last_name,
          email: out.email,
          membership_tier_id: tierMap.get(String(out.membership_tier_id)) ?? out.membership_tier_id,
          status: out.status,
          joined_at: formatDate(out.joined_at),
        };
      }

      return out;
    });

    setSearchResults(rows);
    setSearchLoading(false);
  }

  // Fetch invoices when tile opens
  useEffect(() => {
    if (activeTile === 'invoices') loadInvoices();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTile]);

  // Fetch when a search tile is opened or filters change
  useEffect(() => {
    if (searchTable) handleSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTile, filterTier, filterMemberStatus, filterCategory, filterPublished, filterTime]);

  // Get table columns from results
  function getColumns(rows: Record<string, unknown>[]): string[] {
    if (rows.length === 0) return [];
    return Object.keys(rows[0]).filter(k => !k.startsWith('_'));
  }

  function formatCell(value: unknown): string {
    if (value === null || value === undefined) return '—';
    if (typeof value === 'object') return JSON.stringify(value);
    if (typeof value === 'boolean') return value ? 'Yes' : 'No';
    return String(value);
  }

  function closeModal() {
    setModalRow(null);
    setModalDetail(null);
  }

  async function handleRowClick(row: Record<string, unknown>) {
    if (!searchTable) return;
    setModalRow(row);
    setModalTable(searchTable);
    setModalLoading(true);
    setModalDetail(null);

    const id = (row._id ?? row.id) as number;

    if (searchTable === 'members') {
      const [regRes, couponRes, memberRes] = await Promise.all([
        supabase.from('registrations').select('*, events(title, start_time)').eq('user_id', id),
        supabase.from('coupon_redemptions').select('*, events(title)').eq('user_id', id),
        supabase.from('members').select('membership_tier_id, membership_tiers(annual_ceu_credits, annual_cert_credits)').eq('id', id).single(),
      ]);

      const tier = memberRes.data?.membership_tiers as unknown as Record<string, unknown> | null;
      const ceuTotal = (tier?.annual_ceu_credits as number) || 0;
      const certTotal = (tier?.annual_cert_credits as number) || 0;
      const redemptions = (couponRes.data || []) as Record<string, unknown>[];
      const ceuUsed = redemptions.filter(r => String(r.credit_type).toLowerCase() === 'ceu').length;
      const certUsed = redemptions.filter(r => String(r.credit_type).toLowerCase() === 'cert').length;
      const regs = (regRes.data || []) as Record<string, unknown>[];
      const totalSpent = regs.reduce((sum, r) => sum + (parseFloat(String(r.amount_paid)) || 0), 0);

      setModalDetail({
        registrations: regs,
        couponRedemptions: redemptions,
        ceuRemaining: ceuTotal - ceuUsed,
        certRemaining: certTotal - certUsed,
        ceuTotal,
        certTotal,
        totalSpent,
      });
    }

    if (searchTable === 'events') {
      const [regRes, priceRes, couponRes] = await Promise.all([
        supabase.from('registrations').select('*, members(first_name, last_name, email)').eq('event_id', id),
        supabase.from('price_rules').select('*, membership_tiers(name)').eq('event_id', id),
        supabase.from('coupon_redemptions').select('*, members(first_name, last_name, email)').eq('event_id', id),
      ]);

      const regs = (regRes.data || []) as Record<string, unknown>[];
      const totalRevenue = regs.reduce((sum, r) => sum + (parseFloat(String(r.amount_paid)) || 0), 0);

      setModalDetail({
        registrations: regs,
        totalRevenue,
        priceRules: (priceRes.data || []) as Record<string, unknown>[],
        couponRedemptions: (couponRes.data || []) as Record<string, unknown>[],
      });
    }

    setModalLoading(false);
  }

  return (
    <main className="jross-dashboard">
      <div className="jross-container">
        <div className="jross-header">
          <h1>JROSS Dashboard</h1>
          <p>Event & member management</p>
        </div>

        {/* Tile Grid */}
        {activeTile === null && (
          <div className="jross-tiles">
            <button className="jross-tile" onClick={() => openTile('event')}>
              <h2>Create Event</h2>
              <p>Add a new event with date, location, and category</p>
            </button>
            <button className="jross-tile" onClick={() => openTile('member')}>
              <h2>Add Member</h2>
              <p>Register a new member with tier and status</p>
            </button>
            <button className="jross-tile" onClick={() => openTile('search-events')}>
              <h2>Search Events</h2>
              <p>Browse and filter all events</p>
            </button>
            <button className="jross-tile" onClick={() => openTile('search-members')}>
              <h2>Search Members</h2>
              <p>Browse and filter all members</p>
            </button>
            <button className="jross-tile" onClick={() => openTile('invoices')}>
              <h2>Outstanding Invoices</h2>
              <p>Members with unpaid event registrations</p>
            </button>
          </div>
        )}

        {/* Back button */}
        {activeTile !== null && (
          <button className="jross-back" onClick={() => openTile(null)}>
            &larr; Back
          </button>
        )}

        {/* Create Event */}
        {activeTile === 'event' && (
          <form className="jross-form" onSubmit={handleCreateEvent}>
            <div className="jross-field">
              <label>Title *</label>
              <input
                type="text"
                value={eventTitle}
                onChange={(e) => setEventTitle(e.target.value)}
                required
              />
            </div>
            <div className="jross-field">
              <label>Start Time *</label>
              <input
                type="datetime-local"
                value={eventStart}
                onChange={(e) => setEventStart(e.target.value)}
                required
              />
            </div>
            <div className="jross-field">
              <label>Location</label>
              <input
                type="text"
                value={eventLocation}
                onChange={(e) => setEventLocation(e.target.value)}
              />
            </div>
            <div className="jross-field">
              <label>Category</label>
              <select value={eventCategory} onChange={(e) => setEventCategory(e.target.value)}>
                <option value="">— None —</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
            <div className="jross-checkbox">
              <input
                type="checkbox"
                id="is_published"
                checked={eventPublished}
                onChange={(e) => setEventPublished(e.target.checked)}
              />
              <label htmlFor="is_published">Published</label>
            </div>
            {tiers.length > 0 && (
              <fieldset className="jross-pricing">
                <legend>Pricing by Tier</legend>
                <div className="jross-pricing-grid">
                  {tiers.map((t) => (
                    <div key={t.id} className="jross-pricing-row">
                      <label>{t.name}</label>
                      <div className="jross-pricing-input">
                        <span>$</span>
                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          placeholder="—"
                          value={eventPrices[t.id] ?? ''}
                          onChange={(e) => setEventPrices(prev => ({ ...prev, [t.id]: e.target.value }))}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </fieldset>
            )}
            {eventMsg && (
              <div className={eventMsg.type === 'success' ? 'jross-success' : 'jross-error'}>
                {eventMsg.text}
              </div>
            )}
            <button type="submit" className="jross-submit" disabled={eventLoading || !eventTitle || !eventStart}>
              {eventLoading ? 'Creating...' : 'Create Event'}
            </button>
          </form>
        )}

        {/* Add Member */}
        {activeTile === 'member' && (
          <form className="jross-form" onSubmit={handleAddMember}>
            <div className="jross-field">
              <label>Email *</label>
              <input
                type="email"
                value={memberEmail}
                onChange={(e) => setMemberEmail(e.target.value)}
                required
              />
            </div>
            <div className="jross-field">
              <label>First Name</label>
              <input
                type="text"
                value={memberFirst}
                onChange={(e) => setMemberFirst(e.target.value)}
              />
            </div>
            <div className="jross-field">
              <label>Last Name</label>
              <input
                type="text"
                value={memberLast}
                onChange={(e) => setMemberLast(e.target.value)}
              />
            </div>
            <div className="jross-field">
              <label>Status</label>
              <select value={memberStatus} onChange={(e) => setMemberStatus(e.target.value)}>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            <div className="jross-field">
              <label>Membership Tier</label>
              <select value={memberTier} onChange={(e) => setMemberTier(e.target.value)}>
                <option value="">— None —</option>
                {tiers.map((t) => (
                  <option key={t.id} value={t.id}>{t.name}</option>
                ))}
              </select>
            </div>
            {memberMsg && (
              <div className={memberMsg.type === 'success' ? 'jross-success' : 'jross-error'}>
                {memberMsg.text}
              </div>
            )}
            <button type="submit" className="jross-submit" disabled={memberLoading || !memberEmail}>
              {memberLoading ? 'Adding...' : 'Add Member'}
            </button>
          </form>
        )}

        {/* Search */}
        {searchTable && (
          <div>
            {/* Filters */}
            {searchTable === 'members' && (
              <div className="jross-filters">
                <select value={filterTier} onChange={(e) => setFilterTier(e.target.value)}>
                  <option value="">All Tiers</option>
                  {tiers.map(t => (
                    <option key={t.id} value={t.id}>{t.name}</option>
                  ))}
                </select>
                <select value={filterMemberStatus} onChange={(e) => setFilterMemberStatus(e.target.value)}>
                  <option value="">All Statuses</option>
                  <option value="active">Active</option>
                  <option value="lapsed">Lapsed</option>
                </select>
              </div>
            )}
            {searchTable === 'events' && (
              <div className="jross-filters">
                <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
                  <option value="">All Categories</option>
                  {categories.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
                <select value={filterPublished} onChange={(e) => setFilterPublished(e.target.value)}>
                  <option value="">All</option>
                  <option value="yes">Published</option>
                  <option value="no">Unpublished</option>
                </select>
                <select value={filterTime} onChange={(e) => setFilterTime(e.target.value)}>
                  <option value="">All Time</option>
                  <option value="upcoming">Upcoming</option>
                  <option value="past">Past</option>
                </select>
              </div>
            )}

            <div className="jross-search-controls">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
              <button className="jross-submit" onClick={handleSearch} disabled={searchLoading}>
                {searchLoading ? 'Searching...' : 'Search'}
              </button>
            </div>

            {searchMsg && (
              <div className={searchMsg.type === 'success' ? 'jross-success' : 'jross-error'}>
                {searchMsg.text}
              </div>
            )}

            {searchResults.length > 0 ? (
              <div className="jross-table-wrap">
                <table className="jross-table">
                  <thead>
                    <tr>
                      {getColumns(searchResults).map((col) => (
                        <th key={col}>{formatColumnHeader(col)}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {searchResults.map((row, i) => (
                      <tr key={i} className="jross-table-clickable" onClick={() => handleRowClick(row)}>
                        {getColumns(searchResults).map((col) => (
                          <td key={col}>{formatCell(row[col])}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              !searchLoading && <div className="jross-no-results">No results found.</div>
            )}
          </div>
        )}

        {/* Outstanding Invoices */}
        {activeTile === 'invoices' && (
          <div>
            {invoicesLoading ? (
              <div className="jross-no-results">Loading...</div>
            ) : invoices.length > 0 ? (
              <div className="jross-table-wrap">
                <table className="jross-table">
                  <thead>
                    <tr>
                      {getColumns(invoices).map(col => (
                        <th key={col}>{formatColumnHeader(col)}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {invoices.map((row, i) => (
                      <tr key={i}>
                        {getColumns(invoices).map(col => (
                          <td key={col}>{formatCell(row[col])}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="jross-no-results">No outstanding invoices.</div>
            )}
          </div>
        )}
      </div>

      {/* Row detail modal */}
      {modalRow && (
        <div className="jross-modal-overlay" onClick={closeModal}>
          <div className="jross-modal" onClick={(e) => e.stopPropagation()}>
            <button className="jross-modal-close" onClick={closeModal}>&times;</button>

            {modalLoading ? (
              <div className="jross-modal-loading">Loading details...</div>
            ) : modalDetail && modalTable === 'members' ? (
              <>
                <h2>{[modalRow.first_name, modalRow.last_name].filter(Boolean).join(' ') || 'No name'}</h2>
                <p className="jross-modal-subtitle">{String(modalRow.email)}</p>

                <div className="jross-modal-stats">
                  <div className="jross-modal-stat">
                    <span className="jross-modal-stat-value">{String(modalDetail.ceuRemaining)}/{String(modalDetail.ceuTotal)}</span>
                    <span className="jross-modal-stat-label">CEU Credits</span>
                  </div>
                  <div className="jross-modal-stat">
                    <span className="jross-modal-stat-value">{String(modalDetail.certRemaining)}/{String(modalDetail.certTotal)}</span>
                    <span className="jross-modal-stat-label">Cert Credits</span>
                  </div>
                  <div className="jross-modal-stat">
                    <span className="jross-modal-stat-value">${(modalDetail.totalSpent as number).toFixed(2)}</span>
                    <span className="jross-modal-stat-label">Total Spent</span>
                  </div>
                </div>

                <div className="jross-modal-section">
                  <h3>Events Attended ({(modalDetail.registrations as unknown[]).length})</h3>
                  {(modalDetail.registrations as Record<string, unknown>[]).length > 0 ? (
                    <ul className="jross-modal-list">
                      {(modalDetail.registrations as Record<string, unknown>[]).map((reg, i) => {
                        const ev = reg.events as Record<string, unknown>;
                        return (
                          <li key={i}>
                            <span className="jross-modal-list-primary">{String(ev?.title)}</span>
                            <span className="jross-modal-list-meta">{formatDate(ev?.start_time)} &middot; ${String(reg.amount_paid)}</span>
                          </li>
                        );
                      })}
                    </ul>
                  ) : (
                    <p className="jross-modal-empty">No events attended.</p>
                  )}
                </div>

                <div className="jross-modal-section">
                  <h3>Coupon Redemptions ({(modalDetail.couponRedemptions as unknown[]).length})</h3>
                  {(modalDetail.couponRedemptions as Record<string, unknown>[]).length > 0 ? (
                    <ul className="jross-modal-list">
                      {(modalDetail.couponRedemptions as Record<string, unknown>[]).map((c, i) => {
                        const ev = c.events as Record<string, unknown>;
                        return (
                          <li key={i}>
                            <span className="jross-modal-list-primary">{String(ev?.title)}</span>
                            <span className="jross-modal-list-meta">{String(c.credit_type).toUpperCase()} &middot; {formatDate(c.redeemed_at)}</span>
                          </li>
                        );
                      })}
                    </ul>
                  ) : (
                    <p className="jross-modal-empty">No coupons redeemed.</p>
                  )}
                </div>
              </>
            ) : modalDetail && modalTable === 'events' ? (
              <>
                <h2>{String(modalRow.title)}</h2>
                <p className="jross-modal-subtitle">{String(modalRow.start_time)} &middot; {String(modalRow.location) || 'No location'}</p>

                <div className="jross-modal-stats">
                  <div className="jross-modal-stat">
                    <span className="jross-modal-stat-value">{(modalDetail.registrations as unknown[]).length}</span>
                    <span className="jross-modal-stat-label">Registered</span>
                  </div>
                  <div className="jross-modal-stat">
                    <span className="jross-modal-stat-value">${(modalDetail.totalRevenue as number).toFixed(2)}</span>
                    <span className="jross-modal-stat-label">Total Revenue</span>
                  </div>
                  <div className="jross-modal-stat">
                    <span className="jross-modal-stat-value">{(modalDetail.couponRedemptions as unknown[]).length}</span>
                    <span className="jross-modal-stat-label">Coupons Used</span>
                  </div>
                </div>

                <div className="jross-modal-section">
                  <h3>Registered Members</h3>
                  {(modalDetail.registrations as Record<string, unknown>[]).length > 0 ? (
                    <ul className="jross-modal-list">
                      {(modalDetail.registrations as Record<string, unknown>[]).map((reg, i) => {
                        const mem = reg.members as Record<string, unknown>;
                        const name = `${mem?.first_name || ''} ${mem?.last_name || ''}`.trim() || String(mem?.email);
                        return (
                          <li key={i}>
                            <span className="jross-modal-list-primary">{name}</span>
                            <span className="jross-modal-list-meta">${String(reg.amount_paid)} &middot; {String(reg.status)}</span>
                          </li>
                        );
                      })}
                    </ul>
                  ) : (
                    <p className="jross-modal-empty">No registrations yet.</p>
                  )}
                </div>

                {(modalDetail.priceRules as Record<string, unknown>[]).length > 0 && (
                  <div className="jross-modal-section">
                    <h3>Price Rules</h3>
                    <ul className="jross-modal-list">
                      {(modalDetail.priceRules as Record<string, unknown>[]).map((rule, i) => {
                        const tier = rule.membership_tiers as Record<string, unknown>;
                        return (
                          <li key={i}>
                            <span className="jross-modal-list-primary">{String(tier?.name || 'Any tier')}{rule.name ? ` — ${rule.name}` : ''}</span>
                            <span className="jross-modal-list-meta">${String(rule.price)}</span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}

                {(modalDetail.couponRedemptions as Record<string, unknown>[]).length > 0 && (
                  <div className="jross-modal-section">
                    <h3>Coupon Redemptions</h3>
                    <ul className="jross-modal-list">
                      {(modalDetail.couponRedemptions as Record<string, unknown>[]).map((c, i) => {
                        const mem = c.members as Record<string, unknown>;
                        const name = `${mem?.first_name || ''} ${mem?.last_name || ''}`.trim() || String(mem?.email);
                        return (
                          <li key={i}>
                            <span className="jross-modal-list-primary">{name}</span>
                            <span className="jross-modal-list-meta">{String(c.credit_type).toUpperCase()} &middot; {formatDate(c.redeemed_at)}</span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}
              </>
            ) : null}
          </div>
        </div>
      )}
    </main>
  );
}
