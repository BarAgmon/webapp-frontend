import styled from 'styled-components';
import AllPosts from '../components/AllPosts';

function Home() {
  
  return (
    <PagePosition>
      <Header>Home</Header>
      <FullHeightContainer>
        <AllPostsWrapper>
          <AllPosts />
        </AllPostsWrapper>
      </FullHeightContainer>
    </PagePosition>
  );
};

export default Home;

const PagePosition = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  width: 100vw;
  height: 100vh;
`;

const FullHeightContainer = styled.div`
  flex: 1;
  overflow-y: auto; /* Enable vertical scrolling */
  display: flex;
  align-items: start;
  justify-content: center;
`;

const AllPostsWrapper = styled.div`
  width: flex;
  display: flex;
  align-items: start;
  justify-content: start;
`;

const Header = styled.h2`
  font-family: Assistant;
  font-size: 2em;
  margin-top: 2em;
`;
