export interface IGoodImagesItemProps{
    src: string
    callback: (arg0: string) => void
    alt: string
}

export interface IGoodAccordionProps {
    title: string
    children: React.ReactNode
}