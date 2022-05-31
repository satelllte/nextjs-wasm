abstract class Feature {
  protected static available: () => boolean;
}

// https://developer.mozilla.org/en-US/docs/Web/API/OffscreenCanvas#browser_compatibility
class OffscreenCanvasFeature extends Feature {
  public static override available() {
    return 'OffscreenCanvas' in window
  }
}

export {
  OffscreenCanvasFeature
}
