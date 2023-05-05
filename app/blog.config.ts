import type { NoteBackgroundProps } from "@components/_layout/NoteBackground"
import type { ContactPlatformType } from "@core/contact"
import { getAuthorContactHref } from "@core/contact"

const contacts: Readonly<
    {
        [key in Exclude<ContactPlatformType, "email">]?: string
    } & {
        email: string // ✅ email for RSS
    }
> = {
    email: getAuthorContactHref("email", "danpa725@cau.ac.kr"),
    github: getAuthorContactHref("github", "danpacho"),
}
const author = {
    name: "danpacho",
    introduce: "기록의 힘",
    faviconUrl: "/favicon.ico",
    bannerImageUrl: "/banner.png",
    contacts,
} as const

const blog = {
    url: "https://danpa-note.vercel.app",
    siteName: "danpa note",
    subtitle: "🦦",
    copyright: `${
        author.name
    }© All rights reserved ${new Date().getFullYear()}.`,
    language: "ko",
    googleAnalyticsID: "G-3Q1R8QPN7D", // default to "DISABLED"
}

const config = {
    blogContentsDirectoryName: "blog", // blog contents directory name
    useKatex: false, // katex option
    postPerCategoryPage: 8,
    numberOfLatestPost: 4,
    numberOfMainPageCategory: 5,
    postControllerText: {
        first: (category: string) => `${category}로 돌아가기`, // first post ➡️ no prev post, so replace with your text
        last: (category: string) => `${category}의 마지막 콘텐츠`, // last post ➡️ no next post, so replace with your text
    },
    navigationMenu: [
        {
            name: "Home",
            path: "/",
        },
        {
            name: "Category",
            path: "/category",
        },
        {
            name: "Profile",
            path: "/profile",
        },
    ],
    themeColor: "#7D694B",
    noteBackgroundStyle: {
        rectWidth: 300,
        rectHeight: 200,
        outerRectStrokeWidth: 1.5,
        rectStrokeWidth: 1,
        outerRectStrokeLight: "stroke-gray-300",
        outerRectStrokeDark: "dark:stroke-neutral-700",
        rectStrokeDark: "dark:stroke-teal-700/50",
        bgDark: "dark:bg-neutral-900",
    } as NoteBackgroundProps,
    author,
    ...blog,
} as const

export type BlogInfoType = typeof blog
export type AuthorInfoType = typeof author
export type ConfigType = typeof config

export { config }
