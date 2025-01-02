// pages/index.js
import ProjectList from '../../components/ProjectList';
import UploadForm from '../../components/UploadForm';

const Home = () => {
  return (
    <div>
      <h1>Auto GCP Editor</h1>
      <UploadForm />
      <ProjectList />
    </div>
  );
};

export default Home;
