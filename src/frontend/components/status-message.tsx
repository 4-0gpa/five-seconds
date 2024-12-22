interface StatusMessageProps {
  count?: number
  message: string
  name?: string
}

export function StatusMessage({ count, message, name }: StatusMessageProps) {
  return (
    <div className="text-white text-center space-y-1">
      <h1 className="text-3xl font-bold">5seconds</h1>
      <p className="text-sm">
        {count !== undefined && `${count} `}{message}
        {name && `, ${name}!`}
      </p>
    </div>
  )
}