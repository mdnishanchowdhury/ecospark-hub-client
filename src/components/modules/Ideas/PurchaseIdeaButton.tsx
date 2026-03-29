"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, CreditCard } from "lucide-react";
import { toast } from "sonner";
import { purchasedIdea } from "@/services/ideas/idea.service";
import { getUserInfo } from "@/services/auth/getUserInfo";
import { usePathname, useRouter } from "next/navigation";
import { UserInfo } from "@/types/auth.type";

interface PurchaseButtonProps {
    ideaId: string;
    price: number;
}

export function PurchaseIdeaButton({ ideaId, price }: PurchaseButtonProps) {
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState<UserInfo | null>(null);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const fetchUser = async () => {
            const userInfo = await getUserInfo();
            setUser(userInfo);
        };
        fetchUser();
    }, []);

    const handleAction = async (e: React.MouseEvent) => {
        e.preventDefault();

        if (!user) {
            toast.error("Please login to purchase this idea");
            router.push(`/login?redirect=${pathname}`);
            return;
        }

        try {
            setLoading(true);
            const res = await purchasedIdea({ ideaId: ideaId });

            if (res?.success && res?.data?.paymentUrl) {
                toast.success("Redirecting to Stripe...");
                window.location.href = res.data.paymentUrl;
            } else {
                toast.error(res?.message || "Failed to get payment link");
            }
        } catch (err) {
            toast.error("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Button
            onClick={handleAction}
            disabled={loading}
            className="mt-3 bg-amber-600 hover:bg-amber-700 w-full font-semibold h-11 transition-all active:scale-95"
        >
            {loading ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                </>
            ) : (
                <>
                    <CreditCard className="mr-2 h-4 w-4" />
                    {`Unlock Full Access - $${price}`}
                </>
            )}
        </Button>
    );
}