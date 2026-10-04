const soundFiles = {
  cut1: '/audio/tomato-cut-1.m4a',
  cut2: '/audio/tomato-cut-2.m4a',
  leaves: '/audio/leaves-rustle.m4a',
} as const;
type SoundName = keyof typeof soundFiles;

export function initSound() {
  const button = document.querySelector<HTMLButtonElement>('.sound-toggle');
  const label = document.querySelector<HTMLElement>('[data-sound-label]');
  const status = document.querySelector<HTMLElement>('[data-sound-status]');
  if (!button || !label || typeof window.AudioContext === 'undefined') return;

  let enabled = false;
  let loading = false;
  let failed = false;
  let context: AudioContext | undefined;
  let output: GainNode | undefined;
  let active: AudioBufferSourceNode | undefined;
  let buffers: Partial<Record<SoundName, AudioBuffer>> = {};
  let load: Promise<void> | undefined;
  let toggleRevision = 0;
  let playRevision = 0;
  let cutIndex = 0;

  const updateButton = () => {
    button.hidden = false;
    button.setAttribute('aria-pressed', String(enabled));
    label.textContent = failed ? 'Dźwięk: niedostępny' : loading ? 'Dźwięk: ładowanie' : `Dźwięk: ${enabled ? 'włączony' : 'wyłączony'}`;
    button.setAttribute('aria-label', `${label.textContent}. ${enabled ? 'Wyłącz' : 'Włącz'} dźwięki strony`);
    button.title = enabled ? 'Wyłącz dźwięki strony' : 'Włącz krojenie pomidora i szelest liści';
  };

  const stop = () => {
    playRevision++;
    active?.stop();
    active?.disconnect();
    active = undefined;
  };

  const muteAfterFailure = () => {
    enabled = false;
    loading = false;
    failed = true;
    stop();
    updateButton();
    if (status) status.textContent = 'Nie udało się włączyć dźwięku. Możesz spróbować ponownie.';
  };

  const play = (name: SoundName) => {
    if (!enabled || document.hidden || !context || !output || !buffers[name]) return;
    stop();
    const revision = playRevision;
    const start = () => {
      if (!enabled || document.hidden || revision !== playRevision || !context || !output) return;
      const source = context.createBufferSource();
      source.buffer = buffers[name]!;
      source.connect(output);
      source.onended = () => {
        source.disconnect();
        if (active === source) active = undefined;
      };
      active = source;
      source.start();
    };
    if (context.state === 'running') start();
    else void context.resume().then(start).catch(() => {
      if (revision === playRevision) muteAfterFailure();
    });
  };

  button.addEventListener('click', async () => {
    const revision = ++toggleRevision;
    enabled = !enabled;
    failed = false;
    loading = enabled;
    updateButton();
    if (!enabled) {
      stop();
      if (context) void context.suspend().catch(() => {});
      return;
    }

    try {
      // Create/resume during this explicit click; audio is never started on load.
      if (!context) {
        context = new AudioContext();
        output = context.createGain();
        output.gain.value = .4;
        output.connect(context.destination);
      }
      const resumed = context.resume();
      const audioContext = context;
      load ??= Promise.all(Object.entries(soundFiles).map(async ([name, url]) => {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Sound unavailable');
        const buffer = await audioContext.decodeAudioData(await response.arrayBuffer());
        return [name, buffer] as const;
      })).then((entries) => { buffers = Object.fromEntries(entries); }).catch((error) => {
        load = undefined;
        throw error;
      });
      await Promise.all([resumed, load]);
      if (revision !== toggleRevision || !enabled) return;
      loading = false;
      updateButton();
      if (status) status.textContent = 'Dźwięki włączone. Odkryj punkty przekroju lub zmień rozdział.';
      play('leaves');
    } catch {
      if (revision === toggleRevision) muteAfterFailure();
    }
  });

  document.addEventListener('click', (event) => {
    if (!(event.target instanceof Element)) return;
    if (event.target.closest('[data-slice-part]')) {
      play(cutIndex++ % 2 === 0 ? 'cut1' : 'cut2');
    } else if (event.target.closest('.site-header nav a, .scroll-cue, .inside-bottom a, .back-top')) {
      play('leaves');
    }
  });

  const pause = () => {
    toggleRevision++;
    loading = false;
    stop();
    updateButton();
    if (context) void context.suspend().catch(() => {});
  };
  document.addEventListener('visibilitychange', () => { if (document.hidden) pause(); });
  window.addEventListener('pagehide', pause);
  updateButton();
}
