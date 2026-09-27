"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Compass, MapPin, Pause, Play, X } from "lucide-react";
import { destinations } from "@/lib/destinations";

gsap.registerPlugin(useGSAP);

const COUNT = destinations.length;
const INTERVAL = 5;
const wrap = (index: number) => (index + COUNT) % COUNT;
const motionQuery = "(prefers-reduced-motion: reduce)";
const subscribeMotion = (callback: () => void) => {
  const media = window.matchMedia(motionQuery);
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
};

export function HeroCarousel() {
  const root = useRef<HTMLElement>(null);
  const rail = useRef<HTMLDivElement>(null);
  const progress = useRef<HTMLSpanElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const explore = useRef<HTMLButtonElement>(null);
  const backgrounds = useRef<(HTMLDivElement | null)[]>([]);
  const copies = useRef<(HTMLDivElement | null)[]>([]);
  const cards = useRef<(HTMLButtonElement | null)[]>([]);
  const previous = useRef(0);
  const locked = useRef(false);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const loaded = useRef(new Set<number>());
  const failed = useRef(new Set<number>());
  const pending = useRef<number | null>(null);
  const [active, setActive] = useState(0);
  const [stride, setStride] = useState(244);
  const [visibleCards, setVisibleCards] = useState(1);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(true);
  const [busy, setBusy] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [status, setStatus] = useState("");
  const [imageErrors, setImageErrors] = useState<number[]>([]);
  const reduced = useSyncExternalStore(
    subscribeMotion,
    () => window.matchMedia(motionQuery).matches,
    () => true,
  );
  const destination = destinations[active];
  const playing = !paused && !hovered && visible && !reduced && !dialogOpen && !busy;

  const goTo = useCallback((index: number) => {
    const next = wrap(index);
    if (locked.current || next === active) return;
    if (!loaded.current.has(next) && !failed.current.has(next)) {
      pending.current = next;
      setStatus("Menyiapkan foto destinasi…");
      return;
    }
    pending.current = null;
    locked.current = true;
    setBusy(true);
    setStatus("");
    setActive(next);
  }, [active]);

  useEffect(() => {
    const element = rail.current;
    if (!element) return;
    const resize = new ResizeObserver(() => {
      const style = getComputedStyle(element);
      const width = parseFloat(style.getPropertyValue("--card-width"));
      const gap = parseFloat(style.getPropertyValue("--card-gap"));
      setStride(width + gap);
      setVisibleCards(Math.max(1, Math.floor((element.getBoundingClientRect().width + gap) / (width + gap))));
    });
    resize.observe(element);
    return () => resize.disconnect();
  }, []);

  useEffect(() => {
    const element = root.current;
    if (!element) return;
    let inView = true;
    const sync = () => setVisible(inView && !document.hidden);
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      sync();
    }, { threshold: 0.15 });
    observer.observe(element);
    document.addEventListener("visibilitychange", sync);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, []);

  useGSAP(() => {
    const old = previous.current;
    previous.current = active;
    const changed = old !== active;
    const duration = reduced ? 0.12 : 1.05;
    const timeline = gsap.timeline({
      defaults: { ease: "power3.inOut" },
      onComplete: () => {
        locked.current = false;
        setBusy(false);
      },
    });

    backgrounds.current.forEach((background, index) => {
      gsap.set(background, { opacity: index === old ? 1 : 0, scale: 1, zIndex: index === active ? 2 : 1 });
    });
    copies.current.forEach((copy, index) => {
      gsap.set(copy, { autoAlpha: index === old ? 1 : 0 });
      if (copy) gsap.set(copy.children, { y: 0, opacity: 1 });
    });

    if (changed) {
      timeline.fromTo(backgrounds.current[active],
        { opacity: 0, scale: reduced ? 1 : 1.045 },
        { opacity: 1, scale: 1, duration }, 0);
      timeline.to(backgrounds.current[old], { opacity: 0, duration }, 0);
      const oldCopy = copies.current[old];
      const newCopy = copies.current[active];
      if (oldCopy && newCopy) {
        timeline.to(oldCopy.children, { y: reduced ? 0 : -18, opacity: 0, duration: duration * 0.3, stagger: reduced ? 0 : 0.025 }, 0);
        timeline.set(oldCopy, { autoAlpha: 0 }, duration * 0.4);
        timeline.set(newCopy, { autoAlpha: 1 }, duration * 0.32);
        timeline.fromTo(newCopy.children,
          { y: reduced ? 0 : 28, opacity: 0 },
          { y: 0, opacity: 1, duration: duration * 0.6, stagger: reduced ? 0 : 0.055, ease: "power3.out" }, duration * 0.32);
      }
    } else {
      gsap.set(backgrounds.current[active], { opacity: 1 });
      gsap.set(copies.current[active], { autoAlpha: 1 });
    }

    cards.current.forEach((card, index) => {
      const oldSlot = wrap(index - old - 1);
      const newSlot = wrap(index - active - 1);
      const visibleCard = newSlot < COUNT - 1;
      if (!changed || reduced) {
        gsap.set(card, { x: newSlot * stride, opacity: visibleCard ? 1 : 0, scale: 1 });
      } else if (newSlot > oldSlot) {
        gsap.set(card, { x: oldSlot * stride, opacity: 1 });
        timeline.to(card, { x: -stride, opacity: 0, scale: 0.94, duration: duration * 0.6 }, 0);
        timeline.set(card, { x: newSlot * stride, scale: 1 }, duration * 0.6);
        if (visibleCard) timeline.to(card, { opacity: 1, duration: duration * 0.35 }, duration * 0.65);
      } else {
        gsap.set(card, { x: oldSlot * stride, opacity: oldSlot === COUNT - 1 ? 0 : 1, scale: 1 });
        timeline.to(card, { x: newSlot * stride, opacity: 1, duration }, 0);
      }
    });
    return () => { locked.current = false; };
  }, { scope: root, dependencies: [active, stride, reduced], revertOnUpdate: true });

  useGSAP(() => {
    gsap.set(progress.current, { scaleX: 0 });
    if (!playing) return;
    gsap.to(progress.current, {
      scaleX: 1,
      duration: INTERVAL,
      ease: "none",
      onComplete: () => goTo(active + 1),
    });
  }, { scope: root, dependencies: [active, playing], revertOnUpdate: true });

  const openDetails = () => {
    setPaused(true);
    setDialogOpen(true);
    dialog.current?.showModal();
  };

  return (
    <section
      ref={root}
      className="travel-hero"
      aria-label="Jelajahi destinasi Indonesia"
      aria-roledescription="carousel"
      onFocusCapture={(event) => {
        if (event.target instanceof HTMLElement && event.target.matches(":focus-visible")) setPaused(true);
      }}
      onKeyDown={(event) => {
        if (dialogOpen || (event.key !== "ArrowRight" && event.key !== "ArrowLeft")) return;
        event.preventDefault();
        setPaused(true);
        goTo(active + (event.key === "ArrowRight" ? 1 : -1));
      }}
    >
      <a href="#destination-content" className="skip-link">Lewati ke destinasi</a>
      <div className="hero-scenery" aria-hidden="true">
        {destinations.map((place, index) => (
          <div
            key={place.id}
            ref={(element) => { backgrounds.current[index] = element; }}
            className={`scenery-layer ${index === 0 ? "is-initial" : ""}`}
          >
            <Image
              src={place.image}
              alt=""
              fill
              sizes="100vw"
              preload={index === 0}
              loading={index === 0 ? undefined : "eager"}
              unoptimized
              style={{ objectPosition: place.position }}
              onLoad={() => {
                loaded.current.add(index);
                if (pending.current === index) goTo(index);
              }}
              onError={() => {
                failed.current.add(index);
                setImageErrors((errors) => errors.includes(index) ? errors : [...errors, index]);
                if (pending.current === index) goTo(index);
              }}
            />
          </div>
        ))}
      </div>
      <div className="hero-shade" aria-hidden="true" />

      <header className="hero-header">
        <Link className="wordmark" href="/" aria-label="Ulinkeun — beranda">
          <Compass aria-hidden="true" strokeWidth={1.6} />
          ulinkeun<span className="brand-dot">.</span>
        </Link>
        <p className="header-note">Pergi sejenak, cerita selamanya.</p>
        <button className="header-explore" onClick={() => {
          setPaused(true);
          cards.current[wrap(active + 1)]?.focus({ preventScroll: true });
        }}>
          Jelajahi destinasi <ArrowUpRight size={16} aria-hidden="true" />
        </button>
      </header>

      <div className="hero-layout">
        <div className="hero-story" id="destination-content" tabIndex={-1}>
          <div className="story-stack">
            {destinations.map((place, index) => (
              <div
                key={place.id}
                ref={(element) => { copies.current[index] = element; }}
                className={`destination-copy ${index === 0 ? "is-initial" : ""}`}
                aria-hidden={index !== active}
              >
                <h1 className="destination-name">{place.name.split(" ").map((word) => <span key={word}>{word}</span>)}</h1>
                <p className="destination-region"><MapPin size={16} aria-hidden="true" />{place.region}</p>
                <p className="destination-tagline">{place.tagline}</p>
                <p className="destination-description">{place.description}</p>
              </div>
            ))}
          </div>
          <button ref={explore} className="discover-button" onClick={openDetails} aria-disabled={busy} disabled={busy}>
            Temukan ceritanya <span><ArrowUpRight size={20} aria-hidden="true" /></span>
          </button>
          {imageErrors.includes(active) && <p className="image-notice">Foto belum tersedia. Kamu tetap bisa menjelajahi ceritanya.</p>}
        </div>

        <div className="destination-browser"
          onPointerEnter={(event) => { if (event.pointerType === "mouse") setHovered(true); }}
          onPointerLeave={() => setHovered(false)}
        >
          <div className="browser-heading"><span>Ke mana kita selanjutnya?</span><span className="destination-total">{String(COUNT).padStart(2, "0")} destinasi</span></div>
          <div
            ref={rail}
            className="card-rail"
            onTouchStart={(event) => { touch.current = { x: event.touches[0].clientX, y: event.touches[0].clientY }; }}
            onTouchEnd={(event) => {
              if (!touch.current) return;
              const dx = event.changedTouches[0].clientX - touch.current.x;
              const dy = event.changedTouches[0].clientY - touch.current.y;
              touch.current = null;
              if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) {
                setPaused(true);
                goTo(active + (dx < 0 ? 1 : -1));
              }
            }}
            onTouchCancel={() => { touch.current = null; }}
          >
            {destinations.map((place, index) => {
              const slot = wrap(index - active - 1);
              return (
                <button
                  key={place.id}
                  ref={(element) => { cards.current[index] = element; }}
                  className="destination-card"
                  style={{ transform: `translateX(calc(${wrap(index - 1)} * (var(--card-width) + var(--card-gap))))` }}
                  data-initial-hidden={index === 0 || undefined}
                  aria-label={`Jelajahi ${place.name}`}
                  aria-hidden={slot === COUNT - 1}
                  aria-disabled={busy}
                  tabIndex={slot >= Math.min(visibleCards, COUNT - 1) ? -1 : 0}
                  onClick={() => { setPaused(true); goTo(index); }}
                >
                  <Image src={place.image} alt="" fill sizes="(max-width: 640px) 160px, 232px" unoptimized style={{ objectPosition: place.position }} />
                  <div className="card-shade" />
                  <span className="card-number">{String(index + 1).padStart(2, "0")}</span>
                  <span className="card-text"><span className="card-name">{place.name}</span><span className="card-category">{place.category}</span><span className="card-link">Jelajahi <ArrowUpRight size={16} aria-hidden="true" /></span></span>
                </button>
              );
            })}
          </div>
          <div className="carousel-controls">
            <div className="arrow-controls">
              <button className="circle-button" aria-label="Destinasi sebelumnya" aria-disabled={busy} onClick={() => { setPaused(true); goTo(active - 1); }}><ArrowLeft size={20} aria-hidden="true" /></button>
              <button className="circle-button" aria-label="Destinasi berikutnya" aria-disabled={busy} onClick={() => { setPaused(true); goTo(active + 1); }}><ArrowRight size={20} aria-hidden="true" /></button>
            </div>
            <div className="playback-track" aria-hidden="true"><span ref={progress} /></div>
            <button className="playback-button" aria-label={paused || reduced ? "Putar carousel otomatis" : "Jeda carousel"} aria-pressed={!paused && !reduced} disabled={reduced} onClick={() => setPaused((value) => !value)}>
              {paused || reduced ? <Play size={16} aria-hidden="true" /> : <Pause size={16} aria-hidden="true" />}
            </button>
            <span className="slide-counter"><span>{String(active + 1).padStart(2, "0")}</span><span className="counter-divider">/</span>{String(COUNT).padStart(2, "0")}</span>
          </div>
          <p className="playback-caption">{reduced ? "Mode minim gerakan · gunakan panah untuk menjelajah" : paused ? "Ambil waktumu. Lanjutkan dengan tombol putar." : hovered ? "Berhenti sejenak saat kamu memilih." : "Satu perjalanan baru, setiap 5 detik."}</p>
        </div>
      </div>

      <footer className="hero-footer">
        <span className="footer-invitation"><span className="tiny-line" />Indonesia, selalu punya cerita.</span>
        <span className="footer-location"><Compass size={16} aria-hidden="true" />{destination.category}</span>
        <button className="footer-next" onClick={() => { setPaused(true); goTo(active + 1); }} aria-disabled={busy}>Lanjut menjelajah <ArrowDown size={16} aria-hidden="true" /></button>
      </footer>
      <div className="sr-only" aria-live={paused ? "polite" : "off"} aria-atomic="true">{destination.name}. {destination.region}. Destinasi {active + 1} dari {COUNT}.</div>
      <div className="sr-only" role="status">{status}</div>

      <dialog ref={dialog} className="destination-dialog" aria-labelledby="detail-title" onClose={() => { setDialogOpen(false); explore.current?.focus({ preventScroll: true }); }} onClick={(event) => {
        if (event.target !== event.currentTarget) return;
        const rect = event.currentTarget.getBoundingClientRect();
        if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.current?.close();
      }}>
        <button className="dialog-close circle-button" onClick={() => dialog.current?.close()} aria-label="Tutup detail destinasi"><X size={20} aria-hidden="true" /></button>
        <MapPin className="dialog-pin" size={24} aria-hidden="true" />
        <h2 id="detail-title">Cerita dari {destination.name}</h2>
        <p>{destination.description}</p>
        <h3>Yang bisa kamu jelajahi</h3>
        <ul>{destination.highlights.map((highlight) => <li key={highlight}><ArrowUpRight size={16} aria-hidden="true" />{highlight}</li>)}</ul>
        <p className="dialog-note">Inspirasi destinasi, bukan paket perjalanan. Jadwal dan layanan akan ditambahkan setelah dikonfirmasi.</p>
        <a className="photo-credit" href={destination.creditUrl} target="_blank" rel="noreferrer">{destination.credit}<ArrowUpRight size={16} aria-hidden="true" /></a>
      </dialog>
    </section>
  );
}
