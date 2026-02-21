// Type declarations for lucide-react tree-shakable ESM icon imports
// e.g. import Search from 'lucide-react/dist/esm/icons/search'
declare module 'lucide-react/dist/esm/icons/*' {
  import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react'

  type LucideProps = Partial<SVGProps<SVGSVGElement>> &
    RefAttributes<SVGSVGElement> & {
      size?: string | number
      absoluteStrokeWidth?: boolean
    }

  const Icon: ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
  >
  export default Icon
}
