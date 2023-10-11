import { useLocation, useParams } from 'react-router-dom';

const Header = () => {
  const params = useLocation();
  const boardId = params.pathname.split('/')[2];
  return (
    <div>
      <nav>
        <div>
          <button>Домашня сторінка</button>
        </div>
        {/* logo */}
        <img src="" alt="" />
        {boardId ? (
          <div>
            <button>Опції</button>
            <div>
              <button>Очистити цю дошку</button>
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </nav>
    </div>
  );
};

export default Header;
