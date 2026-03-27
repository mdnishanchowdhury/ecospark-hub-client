export interface IComment {
    id: string;
    content: string;
    userId: string;
    ideaId: string;
    parentId: string | null;
    createdAt: string;
    user: {
        name: string;
        image: string | null;
    };
    replies?: IComment[];
}

export interface IIdea {
    id: string;
    title: string;
    problemStatement: string;
    solution: string;
    description: string;
    images: string[];
    isPaid: boolean;
    price: number;
    status: string;
    feedback: string | null;
    authorId: string;
    categoryId: string;
    createdAt: string;
    updatedAt: string;
    author: {
        name: string;
        email: string;
        image: string | null;
    };
    category: {
        id: string;
        name: string;
    };
    comments: IComment[];
    _count: {
        comments: number;
    };
    upVotes: number;
    downVotes: number;
    totalVotes: number;
    isLocked: boolean;
}