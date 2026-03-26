export interface NavItem {
    title: string,
    href: string,
    icon: string,
    badge?: string | number;
}

export interface NavSection{
    title?:string,
    items:NavItem[]
}     