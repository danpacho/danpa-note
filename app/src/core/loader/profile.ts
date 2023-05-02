import { readFile } from "fs/promises"

import { BlogErrorAdditionalInfo, BlogFileExtractionError } from "@core/error"

import { blogProfileDir, definePlugins } from "@core/loader/util"
import { bundlePost } from "@core/loader/post"

import remarkGfm from "remark-gfm"
import { remarkImageSizeByAlt } from "@lib/remark"

import rehypePrism from "rehype-prism-plus"
import { rehypeInjectCodeClassName } from "@lib/rehype"

/**
 * - you can set custom `remark-rehype` plugin for profile page
 * - check param of {@link definePlugins}
 * @returns profile source extraction at `{blog_dir}/profile/description.mdx`
 */
const getProfileSource = async () => {
    try {
        const profileContent = await readFile(blogProfileDir, "utf-8")
        if (!profileContent)
            throw new BlogFileExtractionError({
                errorNameDescription: "post file extraction error occurred",
                readingFileFormat: ".mdx",
                readingFileLocation: blogProfileDir,
                readingFileName: "profile.mdx",
            })

        const profileSource = await (
            await bundlePost({
                postSource: profileContent,
                customPlugin: definePlugins({
                    // plugins using on profile page
                    rehypePlugins: [rehypePrism, rehypeInjectCodeClassName],
                    remarkPlugins: [remarkImageSizeByAlt, remarkGfm],
                }),
            })
        ).bundledResult.code
        return profileSource
    } catch (err) {
        throw new BlogErrorAdditionalInfo({
            passedError: err,
            errorNameDescription: "profile file reading error",
            message: "",
            customErrorMessage: `your profile file at:\n\n   ${blogProfileDir}`,
        })
    }
}

export { getProfileSource }
