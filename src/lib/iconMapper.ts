import { LucideIcon } from "lucide-react";
import * as Icons from "lucide-react"
export const getIconComponent = (iconName: string): LucideIcon => {
    const IconCompnent = Icons[iconName as keyof typeof Icons]

    if (!IconCompnent) {
        return Icons.HelpCircle
    }
    return IconCompnent as LucideIcon;
}