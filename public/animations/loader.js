/**
 * The command is tied to script-imported library in DOM,
 * and therefore cannot have a bodymovin variable defined
 */
// eslint-disable-next-line
bodymovin.loadAnimation({
  container: document.getElementById('bm'),
  renderer: 'svg',
  loop: true,
  autoplay: true,
  path: 'animations/data.json'
});
