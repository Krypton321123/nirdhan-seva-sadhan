import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from './components/Global/Footer';
import Header from './components/Global/Header';
import LandingPage from './pages/LandingPage';
import CampaignPage from './pages/DetailedCampaign';
import AboutUs from './pages/AboutUs';
import CampaignsPage from './pages/CampaignsPage';
import JoinUs from './pages/JoinUs';
import BlogPage from './pages/LatestBlogs';
import DetailedBlog from './pages/DetailedBlog';
import Gallery from './pages/Gallery';



const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Footer><Header><LandingPage /></Header></Footer>}/>
          <Route path="/detailedCampaign/:id" element={<Footer><Header><CampaignPage /></Header></Footer>} />
          <Route path="/aboutUs" element={<Footer><Header><AboutUs /></Header></Footer>} />
          <Route path="/campaigns" element={<Footer><Header><CampaignsPage /></Header></Footer>} />
          <Route path="/joinus" element={<Footer><Header><JoinUs /></Header></Footer>} />
          <Route path="/ourimpact" element={<Footer><Header><BlogPage /></Header></Footer>} />
          <Route path="/detailedblog/:id" element={<Footer><Header><DetailedBlog /></Header></Footer>} />
          <Route path="/gallery" element={<Footer><Header><Gallery /></Header></Footer>} />
        </Routes>
      </Router>
    </>
  )
}



export default App;