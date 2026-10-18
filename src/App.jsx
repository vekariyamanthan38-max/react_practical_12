
import { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
  Navigate,
  Outlet,
  useLocation,
} from "react-router-dom";

const orders = [
  { id: "ORD-2048", name: "Wireless Headphones", category: "Electronics", price: 2499, date: "18 Oct 2026", status: "Shipped", icon: "🎧", type: "current" },
  { id: "ORD-2049", name: "Smart Watch Pro", category: "Wearables", price: 3999, date: "17 Oct 2026", status: "Processing", icon: "⌚", type: "current" },
  { id: "ORD-2050", name: "Minimal Backpack", category: "Accessories", price: 1599, date: "16 Oct 2026", status: "Delivered", icon: "🎒", type: "current" },
  { id: "ORD-1982", name: "Mechanical Keyboard", category: "Electronics", price: 3299, date: "12 Oct 2026", status: "Delivered", icon: "⌨️", type: "history" },
  { id: "ORD-1976", name: "Running Sneakers", category: "Footwear", price: 2799, date: "08 Oct 2026", status: "Delivered", icon: "👟", type: "history" },
  { id: "ORD-1951", name: "Desk Lamp", category: "Home", price: 1199, date: "01 Oct 2026", status: "Delivered", icon: "💡", type: "history" },
  { id: "ORD-1903", name: "Bluetooth Speaker", category: "Electronics", price: 1899, date: "27 Sep 2026", status: "Cancelled", icon: "🔊", type: "cancelled" },
  { id: "ORD-1890", name: "Travel Bottle", category: "Lifestyle", price: 499, date: "24 Sep 2026", status: "Cancelled", icon: "🧴", type: "cancelled" },
];

const sections = [
  { label: "Current Orders", path: "current", icon: "◷" },
  { label: "Order History", path: "history", icon: "↻" },
  { label: "Cancelled Orders", path: "cancelled", icon: "⊗" },
];

const money = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);

function Sidebar() {
  return (
    <aside className="flex w-full shrink-0 flex-col border-b border-white/10 bg-[#0d1120] p-5 md:sticky md:top-0 md:h-screen md:w-72 md:border-b-0 md:border-r">
      <NavLink to="/orders/current" className="flex items-center gap-3">
        <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 text-2xl shadow-lg shadow-violet-600/20">
          ◈
        </div>
        <div>
          <h1 className="text-xl font-black tracking-tight">
            ORDER<span className="text-violet-400">LY.</span>
          </h1>
          <p className="text-[10px] uppercase tracking-[0.24em] text-slate-500">
            Order management
          </p>
        </div>
      </NavLink>

      <div className="mt-9">
        <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.25em] text-slate-500">
          Workspace
        </p>

        <nav className="flex gap-2 overflow-x-auto md:flex-col">
          {sections.map((item) => (
            <NavLink
              key={item.path}
              to={`/orders/${item.path}`}
              className={({ isActive }) =>
                `flex shrink-0 items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                  isActive
                    ? "bg-gradient-to-r from-violet-600/25 to-indigo-600/10 text-violet-200 ring-1 ring-violet-400/20"
                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                }`
              }
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="mt-8 hidden rounded-2xl border border-violet-400/15 bg-gradient-to-br from-violet-500/10 to-transparent p-5 md:block">
        <div className="mb-3 grid h-10 w-10 place-items-center rounded-xl bg-violet-500/15 text-xl text-violet-300">
          ✦
        </div>
        <p className="font-semibold">Order insights</p>
        <p className="mt-2 text-xs leading-6 text-slate-400">
          Keep your purchases organized in one beautiful dashboard.
        </p>
        <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/10">
          <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-violet-500 to-cyan-400" />
        </div>
        <p className="mt-2 text-[10px] text-slate-500">
          YOUR ORDER JOURNEY
        </p>
      </div>

      <div className="mt-6 flex items-center gap-3 border-t border-white/10 pt-5 md:mt-auto">
        <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-cyan-400 to-violet-500 font-bold text-white">
          U
        </div>
        <div>
          <p className="text-sm font-semibold">User Dashboard</p>
          <p className="text-xs text-slate-500">Customer account</p>
        </div>
        <span className="ml-auto h-2 w-2 rounded-full bg-emerald-400" />
      </div>
    </aside>
  );
}

function DashboardLayout() {
  const location = useLocation();

  const activeSection =
    sections.find((section) =>
      location.pathname.endsWith(`/${section.path}`)
    ) ?? sections[0];

  return (
    <div className="min-h-screen bg-[#080b16] text-slate-100 md:flex">
      <Sidebar />

      <main className="min-w-0 flex-1 p-5 sm:p-8 lg:p-10">
        <header className="mb-9 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-violet-300">
              Workspace / Orders / {activeSection.label}
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
              {activeSection.label}
              <span className="text-violet-400">.</span>
            </h2>
            <p className="mt-2 text-sm text-slate-400">
              Manage and monitor your purchases effortlessly.
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-slate-300">
            <span className="mr-2 text-cyan-300">◷</span>
            Order center · 2026
          </div>
        </header>

        <Outlet />

        <footer className="mt-12 border-t border-white/10 pt-5 text-xs text-slate-500">
          <div className="flex flex-wrap justify-between gap-3">
            <p>© 2026 ORDERLY · Built with React Router</p>
            <p>
              ACTIVE ROUTE:{" "}
              <span className="text-cyan-300">{location.pathname}</span>
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}

function OverviewCards() {
  const stats = [
    { title: "Current Orders", value: "03", icon: "◷", color: "text-violet-300", glow: "from-violet-500/15" },
    { title: "Order History", value: "128", icon: "✓", color: "text-emerald-300", glow: "from-emerald-500/10" },
    { title: "Cancelled", value: "05", icon: "×", color: "text-rose-300", glow: "from-rose-500/10" },
    { title: "Total Saved", value: "₹2.4k", icon: "↗", color: "text-cyan-300", glow: "from-cyan-500/10" },
  ];

  return (
    <div className="mb-8 grid grid-cols-2 gap-4 xl:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.title}
          className={`rounded-2xl border border-white/10 bg-gradient-to-br ${stat.glow} to-[#101525] p-5 transition duration-300 hover:-translate-y-1 hover:border-white/20`}
        >
          <div className="flex items-center justify-between gap-2">
            <p className="text-xs text-slate-400 sm:text-sm">{stat.title}</p>
            <span className={`text-xl ${stat.color}`}>{stat.icon}</span>
          </div>
          <p className="mt-4 text-3xl font-black">{stat.value}</p>
        </div>
      ))}
    </div>
  );
}

function OrdersView({ type }) {
  const [search, setSearch] = useState("");

  const pageInfo = {
    current: {
      heading: "In progress",
      description: "Your latest purchases, all in one place.",
      badge: "ACTIVE",
    },
    history: {
      heading: "Past purchases",
      description: "A complete view of your delivered orders.",
      badge: "COMPLETED",
    },
    cancelled: {
      heading: "Cancelled purchases",
      description: "Review orders that were cancelled.",
      badge: "CANCELLED",
    },
  }[type];

  const filteredOrders = orders.filter(
    (order) =>
      order.type === type &&
      `${order.id} ${order.name} ${order.category}`
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  return (
    <section>
      {type === "current" && <OverviewCards />}

      <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold">{pageInfo.heading}</h3>
          <p className="mt-1 text-sm text-slate-400">
            {pageInfo.description}
          </p>
        </div>

        <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-slate-300">
          {filteredOrders.length} orders found
        </span>
      </div>

      <label className="mb-6 flex items-center gap-3 rounded-xl border border-white/10 bg-[#101525] px-4 py-3 transition focus-within:border-violet-400/60">
        <span className="text-lg text-slate-500">⌕</span>
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search by order ID, product or category..."
          className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-600"
        />
        <span className="hidden text-xs text-slate-600 sm:block">
          SEARCH
        </span>
      </label>

      <div className="space-y-4">
        {filteredOrders.map((order) => (
          <article
            key={order.id}
            className="group rounded-2xl border border-white/10 bg-gradient-to-r from-[#11172a] to-[#0d1220] p-5 transition duration-300 hover:border-violet-400/30 hover:shadow-xl hover:shadow-violet-950/10 sm:p-6"
          >
            <div className="flex flex-wrap items-start gap-4">
              <div className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl border border-white/10 bg-white/[0.04] text-3xl transition group-hover:scale-105">
                {order.icon}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h4 className="font-bold">{order.name}</h4>
                  <span className="rounded-md border border-white/10 px-2 py-1 text-[10px] text-slate-400">
                    {pageInfo.badge}
                  </span>
                </div>
                <p className="mt-2 text-xs text-slate-500">
                  {order.id} · {order.category}
                </p>
                <p className="mt-2 text-xs text-slate-400">
                  Ordered {order.date}
                </p>
              </div>

              <div className="text-left sm:text-right">
                <p className="text-lg font-black">{money(order.price)}</p>
                <span
                  className={`mt-2 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                    order.status === "Delivered"
                      ? "bg-emerald-400/10 text-emerald-300"
                      : order.status === "Cancelled"
                        ? "bg-rose-400/10 text-rose-300"
                        : order.status === "Shipped"
                          ? "bg-cyan-400/10 text-cyan-300"
                          : "bg-amber-400/10 text-amber-300"
                  }`}
                >
                  ● {order.status}
                </span>
              </div>
            </div>

            {type === "current" && (
              <div className="mt-5 border-t border-white/[0.07] pt-4">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>
                    {order.status === "Delivered"
                      ? "Delivery completed"
                      : order.status === "Shipped"
                        ? "Package is on its way"
                        : "Order is being prepared"}
                  </span>
                  <span>
                    {order.status === "Delivered"
                      ? "100%"
                      : order.status === "Shipped"
                        ? "70%"
                        : "30%"}
                  </span>
                </div>
                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/5">
                  <div
                    className={`h-full rounded-full ${
                      order.status === "Delivered"
                        ? "w-full bg-emerald-400"
                        : order.status === "Shipped"
                          ? "w-[70%] bg-cyan-400"
                          : "w-[30%] bg-violet-400"
                    }`}
                  />
                </div>
              </div>
            )}
          </article>
        ))}

        {filteredOrders.length === 0 && (
          <div className="rounded-2xl border border-dashed border-white/15 px-6 py-16 text-center">
            <p className="text-3xl">⌕</p>
            <h4 className="mt-4 font-bold">No orders found</h4>
            <p className="mt-2 text-sm text-slate-500">
              Try another search term.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Navigate to="/orders/current" replace />} />

          <Route path="orders" element={<Outlet />}>
            <Route
              index
              element={<Navigate to="/orders/current" replace />}
            />
            <Route
              path="current"
              element={<OrdersView type="current" />}
            />
            <Route
              path="history"
              element={<OrdersView type="history" />}
            />
            <Route
              path="cancelled"
              element={<OrdersView type="cancelled" />}
            />
          </Route>

          <Route
            path="*"
            element={
              <div className="rounded-2xl border border-white/10 bg-[#101525] p-12 text-center">
                <p className="text-4xl">404</p>
                <h2 className="mt-4 text-xl font-bold">
                  Page not found
                </h2>
                <NavLink
                  to="/orders/current"
                  className="mt-5 inline-block text-violet-300 underline"
                >
                  Return to orders
                </NavLink>
              </div>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
