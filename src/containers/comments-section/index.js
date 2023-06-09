import { memo, useCallback, useState } from 'react';
import useStore from '../../hooks/use-store';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import useInit from '../../hooks/use-init';
import commentsActions from '../../store-redux/comments/action';
import { useSelector as useSelectorRedux } from 'react-redux/es/hooks/useSelector';
import shallowequal from 'shallowequal';
import treeToList from '../../utils/tree-to-list';
import listToTree from '../../utils/list-to-tree';
import { transformComments } from '../../utils/comments-list-to-tree';
import Spinner from '../../components/spinner';
import Item from '../../components/item';
import CommentsList from '../../components/comments-list';
import ItemComment from '../../components/item-comment';
import CommentsLogin from '../../components/comments-login';
import useSelector from '../../hooks/use-selector';

function CommentsSection() {
  const store = useStore();
  const dispatch = useDispatch();

  // Параметры из пути /articles/:id
  const params = useParams();
  useInit(async () => {
    await new Promise( () =>
        dispatch(commentsActions.load(params.id))
    );
  }, [params.id] );

  const select = useSelectorRedux(state => ({
    comments: state.comments.data,
    count: state.comments.data.count,
    waiting: state.comments.waiting
  }), shallowequal);

  const session = useSelector(state => ({
    isAuth: state.session.exists,
    userId: state.session.user._id
  }));

  if (Object.keys(select.comments).length) {
    // console.log(session.userId);
    // console.log(treeToList(listToTree(select.comments.items)));
    // console.log(transformComments(select.comments.items));
  }

  const [comment, setComment] = useState('');

  const callbacks = {
    // Колбэк на ввод в элементах формы
    onChange: useCallback(value => {
      setComment(value);
    }, []),

    onSubmit: useCallback(() => {
      console.log(comment);
    }, [comment])
  };

  const renders = {
    item: useCallback((item, exactCommentId, onChangeCommentId) => (
        <ItemComment
            item={item}
            isAuth={session.isAuth}
            userId={session.userId}
            exactCommentId={exactCommentId}
            onChangeCommentId={onChangeCommentId}
            onChangeComment={callbacks.onChange}
            onSubmitComment={callbacks.onSubmit}
        />
    ), [session.isAuth, callbacks.onChange, callbacks.onSubmit]),
  };

  return (
      <Spinner active={select.waiting}>
        {select.comments?.items?.length && (
            <CommentsList
                list={transformComments(select.comments.items)}
                count={select.count}
                isAuth={session.isAuth}
                commentValue={comment}
                onChange={callbacks.onChange}
                onSubmit={callbacks.onSubmit}
                renderItem={renders.item}
            />
        )}
      </Spinner>
  );
}

export default memo(CommentsSection);
