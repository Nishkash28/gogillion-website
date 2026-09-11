export function RegisteredName({ name }: { name: string }) {
  return <span className="registered-name">{name}<sup className="registered-mark">®</sup></span>
}

export function RegisteredCopy({ text }: { text: string }) {
  return text.split(/(Lucida|HerA|Nirvaan)/g).map((part, index) =>
    /^(Lucida|HerA|Nirvaan)$/.test(part)
      ? <RegisteredName name={part} key={index} />
      : part,
  )
}
