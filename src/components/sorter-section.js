export function SorterSection({ title, subtitle, children }) {
  return (
    <div className="flex-1 flex flex-col">
      <div className="mb-2">
        <h3 className="uppercase font-bold">{title}</h3>
        <p className="text-sm">{subtitle}</p>
      </div>
      {children}
    </div>
  )
}
