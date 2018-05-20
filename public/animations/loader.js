/**
 * The command is tied to script-imported library in DOM,
 * and therefore cannot have a bodymovin variable defined
 */

bodymovin.loadAnimation({
  container: document.getElementById('animation'),
  renderer: 'svg',
  loop: true,
  autoplay: true,
  path: 'animations/data.json'
});
