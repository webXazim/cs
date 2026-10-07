export default function FeaturePills({ items }) {
  return (
    <div className="panel-points">
      {items.map((item) => <span key={item}>{item}</span>)}
    </div>
  );
}
