// svg.d.ts

declare module '*.svg' {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>
  export default content
}

declare module '*.svg?raw' {
  const content: string
  export default content
}
