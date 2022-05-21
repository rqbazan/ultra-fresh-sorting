import clsx from 'clsx'

export function Button({ className, ...props }) {
  return (
    <button
      {...props}
      className={clsx(
        className,
        'bg-blue-600 text-white px-3 py-1 rounded-sm uppercase font-bold active:scale-95'
      )}
    />
  )
}
