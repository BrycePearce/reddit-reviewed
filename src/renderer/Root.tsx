import { AuthenticationWrapper } from './components/Authentication/AuthenticationWrapper';
import Aside from './components/Layout/Aside';
import Navbar from './components/Layout/Navbar';
import { ListPosts } from './components/views/ListView/ListPosts';

const Root = () => {
  return (
    <AuthenticationWrapper>
      <div className="flex h-screen">
        <aside className="h-screen w-52 bg-base-200 shrink-0">
          <Aside />
        </aside>

        <div className="flex flex-col flex-1">
          <Navbar />

          <main className="flex items-center justify-center flex-1 p-6">
            <ListPosts />
          </main>
        </div>
      </div>
    </AuthenticationWrapper>
  );
};
export default Root;
