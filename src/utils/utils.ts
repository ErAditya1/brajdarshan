export function canEditPerform(user: any, author: any) {
  if (!user) return false;
  if (user.role === "admin" || user.role === "editor") return true;
  if ( author?._id?.toString() === user.id)
    return true;
  return false;
}

export function canDeletePerform(user: any, author:any) {
    if ( author?._id?.toString() === user.id) return true
  return user?.role === "admin";
}


export function canEditBlog(user: any, blog: any) {
  if (!user) return false;
  if (user.role === "admin" || user.role === "editor") return true;
  return blog.author._id?.toString() === user.id;
}

export function canDeleteBlog(user: any) {
  return user?.role === "admin";
}