import { memo, useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import useInit from '../../hooks/use-init';
import commentsActions from '../../store-redux/comments/action';
import { useSelector as useSelectorRedux } from 'react-redux/es/hooks/useSelector';
import shallowequal from 'shallowequal';
import { transformComments } from '../../utils/comments-list-to-tree';
import Spinner from '../../components/spinner';
import CommentsList from '../../components/comments-list';
import ItemComment from '../../components/item-comment';
import CommentsLogin from '../../components/comments-login';
import useSelector from '../../hooks/use-selector';
import Title from '../../components/title';
import BlockLayout from '../../components/block-layout';
import CommentsForm from '../../components/comments-form';
import listToTree from '../../utils/list-to-tree';
import treeToList from '../../utils/tree-to-list';

function CommentsSection() {
  const dispatch = useDispatch();

  // Параметры из пути /articles/:id
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  useInit(async () => {
    await new Promise( () =>
        dispatch(commentsActions.load(params.id))
    );
  }, [params.id]);

  const select = useSelectorRedux(state => ({
    comments: state.comments.data,
    count: state.comments.count,
    waiting: state.comments.waiting
  }), shallowequal);

  const session = useSelector(state => ({
    isAuth: state.session.exists,
    userId: state.session.user._id
  }));

  const [comment, setComment] = useState('');
  const [exactCommentId, setExactCommentId] = useState('');

  const callbacks = {
    // Колбэк на ввод в элементах формы
    onChange: useCallback(value => {
      setComment(value);
    }, []),

    onCommentIdChange: useCallback(value => {
      setExactCommentId(value);
    }, []),

    // Переход к авторизации
    onSignIn: useCallback(() => {
      navigate('/login', {state: {back: location.pathname}});
    }, [location.pathname]),

    onSubmit: useCallback((text, parent) => {
      dispatch(commentsActions.post(text, parent));
      setComment('');
      setExactCommentId('');
    }, [comment]),

    getCommentsList: useCallback(() => {
      if (select.comments.items) {
        return treeToList(
            listToTree(select.comments.items, 'article'), (item, level) => ({...item, level})
        );
      }
    }, [select.comments])
  };

  const renders = {
    item: useCallback((item) => (
        <ItemComment
            item={item}
            isAuth={session.isAuth}
            userId={session.userId}
            exactCommentId={exactCommentId}
            onChangeCommentId={callbacks.onCommentIdChange}
            onChangeComment={callbacks.onChange}
            onSubmitComment={callbacks.onSubmit}
            onSignIn={callbacks.onSignIn}
        />
    ), [
      select.comments,
      session.isAuth,
      exactCommentId,
      callbacks.onChangeCommentId,
      callbacks.onChange,
      callbacks.onSubmit,
      callbacks.onSignIn
    ]),
  };

  return (
      <BlockLayout>
        <Spinner active={select.waiting}>
          <Title>Комментарии ({select.waiting ? '0' : select.count})</Title>
          {select.comments?.items?.length ? (
            <CommentsList
              list={transformComments(select.comments.items)}
              renderItem={renders.item}
            />
          ) : null}
          {!exactCommentId &&
            (session.isAuth
              ? <CommentsForm
                  id={params.id}
                  value={comment}
                  onChange={callbacks.onChange}
                  onSubmitComment={callbacks.onSubmit}
              />
              : <CommentsLogin onSignIn={callbacks.onSignIn}/>
            )
          }
        </Spinner>
      </BlockLayout>
  );
}

export default memo(CommentsSection);
