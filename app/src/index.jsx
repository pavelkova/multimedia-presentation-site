import React from 'react';
import {render} from 'react-dom';

import {ImgContent} from './assets/content_image-page';
import ImagePage from './pages/page_image-header';

import {TlContent} from './assets/content_timeline-page';
import TimelinePage from './pages/page_timeline';

import {HdContent} from './assets/content_header-page';
import HeaderPage from './pages/page_frame-header';

import {VidContent} from './assets/content_video-page';
import VideoPage from './pages/page_video';

class BandBio extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 1
    }
  }

  _testIt = (e) => {
    console.log(e);
  }

  componentWillMount() {
    window.onscroll = () => {
      console.log(this);
    }
  }

  render() {
    return (
    <div>
      <ImagePage ref='page1' page={ImgContent.page1} />
      <TimelinePage ref='page2' page={TlContent.page2} />
      <HeaderPage ref='page3' page={HdContent.page3} />
      <VideoPage page={VidContent.page4} />
      <ImagePage page={ImgContent.page5} />
      <VideoPage page={VidContent.page6} />
    </div>
    );
  }
}

render(<BandBio />, document.getElementById('app'));
