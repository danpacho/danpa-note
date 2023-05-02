import { BLOG_CONTENTS_DIR, BLOG_PROFILE_DIR } from "@constants/index"
import { join as pathJoin, dirname } from "path"

const blogContentsDir = pathJoin(dirname(process.cwd()), BLOG_CONTENTS_DIR)
const blogProfileDir = pathJoin(dirname(process.cwd()), BLOG_PROFILE_DIR)

export { blogContentsDir, blogProfileDir }
