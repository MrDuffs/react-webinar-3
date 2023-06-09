export function transformComments(comments) {
  const hashTable = Object.create(null);
  const dataTree = [];

  for (const comment of comments) {
    comment.children = [];
    hashTable[comment._id] = comment;

    const parentId = comment.parent?._tree?.[0]._id;
    const parentComment = hashTable[parentId];

    if (parentComment) {
      parentComment.children.push(comment);
    } else {
      dataTree.push(comment);
    }
  }

  return dataTree;
}
