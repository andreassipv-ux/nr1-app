import { supabase } from "@/lib/supabaseClient";

export const dynamic = "force-dynamic";

export default async function Dashboard() {
  // CONTADORES REAIS
  const { count: denuncias } = await supabase
    .from("denuncias")
    .select("*", { count: "exact", head: true });

  const { count: protocolos } = await supabase
    .from("protocolos")
    .select("*", { count: "exact", head: true });

  const { count: campanhas } = await supabase
    .from("campanhas")
    .select("*", { count: "exact", head: true });

  // ÚLTIMAS DENÚNCIAS
  const { data: ultimasDenuncias } = await supabase
    .from("denuncias")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(10);

  return (
    <div style={styles.page}>
      {/* HEADER */}
      <header style={styles.header}>
        <h1 style={styles.title}>Dashboard NR-1</h1>
        <p style={styles.subtitle}>Visão rápida do sistema</p>
      </header>

      {/* CARDS */}
      <section style={styles.cards}>
        <Card title="Denúncias" value={denuncias ?? 0} />
        <Card title="Protocolos" value={protocolos ?? 0} />
        <Card title="Campanhas" value={campanhas ?? 0} />
      </section>

      {/* LISTA */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Últimas denúncias</h2>

        <div style={styles.list}>
          {ultimasDenuncias?.map((item: any) => (
            <div key={item.id} style={styles.cardItem}>
              <div style={styles.cardTop}>
                <strong>{item.tipo || "Sem tipo"}</strong>
                <span style={styles.time}>
                  {new Date(item.created_at).toLocaleString()}
                </span>
              </div>

              <p style={styles.message}>
                {item.mensagem || "Sem mensagem"}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* BOTÃO FLUTUANTE */}
      <button style={styles.fab}>
        +
      </button>
    </div>
  );
}

/* CARD */
function Card({
  title,
  value,
}: {
  title: string;
  value: number;
}) {
  return (
    <div style={styles.card}>
      <p style={styles.cardTitle}>{title}</p>
      <p style={styles.cardValue}>{value}</p>
    </div>
  );
}

/* ESTILOS MOBILE-FIRST */
const styles: Record<string, React.CSSProperties> = {
  page: {
    padding: "16px",
    background: "#f5f6fa",
    minHeight: "100vh",
    fontFamily: "Arial, sans-serif",
  },

  header: {
    marginBottom: "16px",
  },

  title: {
    fontSize: "22px",
    margin: 0,
    fontWeight: 700,
  },

  subtitle: {
    margin: 0,
    fontSize: "14px",
    color: "#666",
  },

  cards: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: "12px",
    marginBottom: "20px",
  },

  card: {
    background: "#111827",
    color: "white",
    padding: "16px",
    borderRadius: "12px",
  },

  cardTitle: {
    fontSize: "13px",
    opacity: 0.8,
    margin: 0,
  },

  cardValue: {
    fontSize: "24px",
    fontWeight: "bold",
    margin: "8px 0 0 0",
  },

  section: {
    marginTop: "10px",
  },

  sectionTitle: {
    fontSize: "16px",
    marginBottom: "10px",
  },

  list: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },

  cardItem: {
    background: "#fff",
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #eee",
  },

  cardTop: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "13px",
  },

  time: {
    fontSize: "11px",
    color: "#888",
  },

  message: {
    marginTop: "8px",
    fontSize: "14px",
  },

  fab: {
    position: "fixed",
    right: "18px",
    bottom: "18px",
    width: "56px",
    height: "56px",
    borderRadius: "50%",
    background: "#2563eb",
    color: "white",
    fontSize: "28px",
    border: "none",
    boxShadow: "0 6px 15px rgba(0,0,0,0.2)",
  },
};