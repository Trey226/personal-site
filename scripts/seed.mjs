import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

// Parse .env.local without dotenv
const __dirname = dirname(fileURLToPath(import.meta.url));
const envText = readFileSync(resolve(__dirname, '..', '.env.local'), 'utf-8');
const env = {};
for (const line of envText.split('\n')) {
  const match = line.match(/^\s*([\w]+)\s*=\s*"?([^"]*)"?\s*$/);
  if (match) env[match[1]] = match[2];
}

const supabase = createClient(
  env.NEXT_PUBLIC_SUPABASE_URL,
  env.SUPABASE_SERVICE_ROLE_KEY   // service role to bypass RLS
);

// ── Helpers ──────────────────────────────────────────────
function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
function pickN(arr, n) {
  const s = [...arr].sort(() => Math.random() - 0.5);
  return s.slice(0, Math.min(n, s.length));
}
function randInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
function chance(pct) { return Math.random() < pct; }
function money(min, max) { return +(min + Math.random() * (max - min)).toFixed(2); }

function randomDate(start, end) {
  const s = new Date(start).getTime();
  const e = new Date(end).getTime();
  return new Date(s + Math.random() * (e - s)).toISOString();
}

// ── Seed Data ────────────────────────────────────────────
const CATEGORIES = ['Workshop', 'Conference', 'Webinar', 'Networking', 'Certification Exam', 'Community Service'];

const TIERS = [
  { name: 'Bronze', annual_ceu_credits: 4, annual_cert_credits: 2 },
  { name: 'Silver', annual_ceu_credits: 8, annual_cert_credits: 4 },
  { name: 'Gold',   annual_ceu_credits: 12, annual_cert_credits: 6 },
  { name: 'Platinum', annual_ceu_credits: 20, annual_cert_credits: 10 },
];

const LOCATIONS = [
  'Main Conference Hall', 'Room 201-B', 'Downtown Hilton', 'Virtual (Zoom)',
  'Community Center', 'University Auditorium', 'Marriott Ballroom',
  'Tech Hub Co-working', null, null,   // ~20% no location
];

const EVENT_TEMPLATES = [
  { title: 'Annual Leadership Summit 2025', cat: 'Conference', future: false },
  { title: 'Spring CEU Workshop', cat: 'Workshop', future: false },
  { title: 'Intro to Trauma-Informed Care', cat: 'Webinar', future: false },
  { title: 'Ethics in Practice Seminar', cat: 'Workshop', future: false },
  { title: 'State Certification Prep', cat: 'Certification Exam', future: false },
  { title: 'Summer Networking Mixer', cat: 'Networking', future: false },
  { title: 'Advanced Clinical Techniques', cat: 'Workshop', future: false },
  { title: 'Community Outreach Day', cat: 'Community Service', future: false },
  { title: 'Fall Professional Development Series', cat: 'Conference', future: false },
  { title: 'Motivational Interviewing Deep Dive', cat: 'Webinar', future: false },
  { title: 'Annual Gala & Awards Night', cat: 'Networking', future: false },
  { title: 'Grief & Loss Continuing Ed', cat: 'Workshop', future: false },
  { title: '2026 Kickoff Conference', cat: 'Conference', future: true },
  { title: 'Spring Certification Exam Window', cat: 'Certification Exam', future: true },
  { title: 'Diversity & Inclusion Workshop', cat: 'Workshop', future: true },
  { title: 'Telehealth Best Practices Webinar', cat: 'Webinar', future: true },
  { title: 'Earth Day Community Cleanup', cat: 'Community Service', future: true },
  { title: 'Summer Social & BBQ', cat: 'Networking', future: true },
];

const FIRST_NAMES = [
  'James','Mary','Robert','Patricia','John','Jennifer','Michael','Linda',
  'David','Elizabeth','William','Barbara','Richard','Susan','Joseph','Jessica',
  'Thomas','Sarah','Charles','Karen','Christopher','Lisa','Daniel','Betty',
  'Matthew','Sandra','Anthony','Margaret','Mark','Ashley','Donald','Kimberly',
  'Steven','Emily','Andrew','Donna','Paul','Michelle','Joshua','Carol',
  'Kenneth','Amanda','Kevin','Dorothy','Brian','Melissa','George','Deborah',
  'Timothy','Stephanie',
];

const LAST_NAMES = [
  'Smith','Johnson','Williams','Brown','Jones','Garcia','Miller','Davis',
  'Rodriguez','Martinez','Hernandez','Lopez','Gonzalez','Wilson','Anderson',
  'Thomas','Taylor','Moore','Jackson','Martin','Lee','Perez','Thompson',
  'White','Harris','Sanchez','Clark','Ramirez','Lewis','Robinson','Walker',
  'Young','Allen','King','Wright','Scott','Torres','Nguyen','Hill',
  'Flores','Green','Adams','Nelson','Baker','Hall','Rivera','Campbell',
  'Mitchell','Carter',
];

// ── Main ─────────────────────────────────────────────────
async function main() {
  console.log('Clearing all tables...');
  // Delete in FK-safe order
  await supabase.from('coupon_redemptions').delete().gte('id', 0);
  await supabase.from('price_rules').delete().gte('id', 0);
  await supabase.from('registrations').delete().gte('id', 0);
  await supabase.from('members').delete().gte('id', 0);
  await supabase.from('events').delete().gte('id', 0);
  await supabase.from('event_categories').delete().gte('id', 0);
  await supabase.from('membership_tiers').delete().gte('id', 0);
  console.log('  All tables cleared.');

  // ── 1. Event Categories ──
  console.log('Seeding event_categories...');
  const { data: catRows, error: catErr } = await supabase
    .from('event_categories').insert(CATEGORIES.map(name => ({ name }))).select('id, name');
  if (catErr) { console.error(catErr); process.exit(1); }
  const catMap = Object.fromEntries(catRows.map(c => [c.name, c.id]));
  console.log(`  ${catRows.length} categories`);

  // ── 2. Membership Tiers ──
  console.log('Seeding membership_tiers...');
  const { data: tierRows, error: tierErr } = await supabase
    .from('membership_tiers').insert(TIERS).select('id, name');
  if (tierErr) { console.error(tierErr); process.exit(1); }
  const tierMap = Object.fromEntries(tierRows.map(t => [t.name, t.id]));
  const tierIds = tierRows.map(t => t.id);
  console.log(`  ${tierRows.length} tiers`);

  // ── 3. Events ──
  console.log('Seeding events...');
  const eventPayloads = EVENT_TEMPLATES.map(tmpl => ({
    title: tmpl.title,
    category_id: catMap[tmpl.cat],
    start_time: tmpl.future
      ? randomDate('2026-03-01', '2026-09-30')
      : randomDate('2024-06-01', '2026-02-01'),
    location: pick(LOCATIONS),
    is_published: tmpl.future ? chance(0.6) : true,  // past events all published, future ~60%
  }));

  const { data: eventRows, error: evErr } = await supabase
    .from('events').insert(eventPayloads).select('id, title, start_time');
  if (evErr) { console.error(evErr); process.exit(1); }
  const eventIds = eventRows.map(e => e.id);
  const pastEventIds = eventRows
    .filter(e => new Date(e.start_time) < new Date())
    .map(e => e.id);
  const futureEventIds = eventRows
    .filter(e => new Date(e.start_time) >= new Date())
    .map(e => e.id);
  console.log(`  ${eventRows.length} events (${pastEventIds.length} past, ${futureEventIds.length} upcoming)`);

  // ── 4. Price Rules (tier-based pricing per event) ──
  console.log('Seeding price_rules...');
  const priceRules = [];
  for (const eid of eventIds) {
    // Base price varies by event
    const base = pick([30, 50, 75, 100, 150]);
    for (const tier of tierRows) {
      // Higher tiers get bigger discounts
      const discount = tier.name === 'Platinum' ? 0.5
        : tier.name === 'Gold' ? 0.7
        : tier.name === 'Silver' ? 0.85
        : 1.0;
      priceRules.push({
        event_id: eid,
        name: `${tier.name} Rate`,
        target_tier_id: tier.id,
        price: +(base * discount).toFixed(2),
      });
    }
  }
  const { error: prErr } = await supabase.from('price_rules').insert(priceRules);
  if (prErr) { console.error(prErr); process.exit(1); }
  console.log(`  ${priceRules.length} price rules`);

  // ── 5. Members (50) ──
  console.log('Seeding members...');
  const usedEmails = new Set();
  const memberPayloads = [];

  // Weight tiers: more Silver/Gold, fewer Bronze/Platinum
  const tierWeights = [
    { name: 'Bronze', weight: 0.15 },
    { name: 'Silver', weight: 0.35 },
    { name: 'Gold', weight: 0.35 },
    { name: 'Platinum', weight: 0.15 },
  ];
  function weightedTier() {
    const r = Math.random();
    let cum = 0;
    for (const tw of tierWeights) {
      cum += tw.weight;
      if (r < cum) return tierMap[tw.name];
    }
    return tierMap['Silver'];
  }

  for (let i = 0; i < 50; i++) {
    const first = pick(FIRST_NAMES);
    const last = pick(LAST_NAMES);
    let email = `${first.toLowerCase()}.${last.toLowerCase()}@example.com`;
    let suf = 2;
    while (usedEmails.has(email)) {
      email = `${first.toLowerCase()}.${last.toLowerCase()}${suf}@example.com`;
      suf++;
    }
    usedEmails.add(email);

    memberPayloads.push({
      email,
      first_name: first,
      last_name: last,
      membership_tier_id: weightedTier(),
      status: chance(0.82) ? 'active' : 'lapsed',
      joined_at: randomDate('2023-01-01', '2026-01-31'),
    });
  }

  const { data: memberRows, error: memErr } = await supabase
    .from('members').insert(memberPayloads).select('id, membership_tier_id, status');
  if (memErr) { console.error(memErr); process.exit(1); }
  console.log(`  ${memberRows.length} members (${memberRows.filter(m => m.status === 'lapsed').length} lapsed)`);

  // ── 6. Registrations ──
  // Active members attend 1-6 events, lapsed members 0-2
  // Members mostly attend past events, some signed up for future ones
  console.log('Seeding registrations...');
  const registrations = [];

  for (const mem of memberRows) {
    const isActive = mem.status === 'active';
    const numPast = randInt(isActive ? 1 : 0, isActive ? 5 : 2);
    const numFuture = isActive && futureEventIds.length > 0 ? randInt(0, 2) : 0;

    const myPastEvents = pickN(pastEventIds, numPast);
    const myFutureEvents = pickN(futureEventIds, numFuture);

    for (const eid of myPastEvents) {
      registrations.push({
        user_id: mem.id,
        event_id: eid,
        amount_paid: money(0, 150),
        status: chance(0.75) ? 'confirmed' : chance(0.6) ? 'unpaid' : 'cancelled',
        created_at: randomDate('2024-01-01', '2026-02-01'),
      });
    }
    for (const eid of myFutureEvents) {
      registrations.push({
        user_id: mem.id,
        event_id: eid,
        amount_paid: money(25, 150),
        status: 'confirmed',
        created_at: randomDate('2026-01-01', '2026-02-13'),
      });
    }
  }

  // Insert in batches and collect IDs for coupon_redemptions
  const allRegs = [];
  for (let i = 0; i < registrations.length; i += 100) {
    const batch = registrations.slice(i, i + 100);
    const { data: regData, error: regErr } = await supabase
      .from('registrations').insert(batch).select('id, user_id, event_id');
    if (regErr) { console.error(regErr); process.exit(1); }
    allRegs.push(...regData);
  }
  console.log(`  ${allRegs.length} registrations`);

  // ── 7. Coupon Redemptions ──
  // ~25% of confirmed registrations use a coupon, slight bias toward CEU
  console.log('Seeding coupon_redemptions...');
  const redemptions = [];
  for (const reg of allRegs) {
    if (chance(0.25)) {
      redemptions.push({
        user_id: reg.user_id,
        event_id: reg.event_id,
        registration_id: reg.id,
        credit_type: chance(0.6) ? 'CEU' : 'CERT',
        redeemed_at: randomDate('2024-06-01', '2026-02-13'),
      });
    }
    // ~5% use a second coupon of the other type
    if (chance(0.05)) {
      redemptions.push({
        user_id: reg.user_id,
        event_id: reg.event_id,
        registration_id: reg.id,
        credit_type: chance(0.5) ? 'CEU' : 'CERT',
        redeemed_at: randomDate('2024-06-01', '2026-02-13'),
      });
    }
  }

  if (redemptions.length > 0) {
    for (let i = 0; i < redemptions.length; i += 100) {
      const batch = redemptions.slice(i, i + 100);
      const { error: cErr } = await supabase.from('coupon_redemptions').insert(batch);
      if (cErr) { console.error(cErr); process.exit(1); }
    }
  }
  console.log(`  ${redemptions.length} coupon redemptions`);

  console.log('\nSeed complete!');
}

main().catch(console.error);
