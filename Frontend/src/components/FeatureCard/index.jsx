export default function FeatureCard({ icon, title, desc }) {
  return (
    <div className="rounded-xl border border-border/30 bg-card/80 backdrop-blur-xl shadow-md hover:shadow-lg transition">
      <div className="p-6">
        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 text-primary">
          {icon}
        </div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground">{desc}</p>
      </div>
    </div>
  );
}
