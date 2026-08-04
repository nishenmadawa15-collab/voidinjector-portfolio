export default function GlitchText({ text, className = '', as: Tag = 'h1' }) {
  return (
    <Tag className={`glitch-text flicker ${className}`} data-text={text}>
      {text}
    </Tag>
  )
}
