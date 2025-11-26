import TextSection from './text-section.svelte';
import ImageSection from './image-section.svelte';
import ImageGallery from './image-gallery.svelte';
// Add more imports as you create new content types
import EmbeddedVideo from './embedded-video.svelte';

export const contentComponentMap = {
    TextSection,
    ImageSection, 
    ImageGallery,
    EmbeddedVideo,
  // Add more mappings here as needed
};
