// Heroicons (24 px, outline) by name, as SVG text: Icon.svelte draws them. Add an icon here
// instead of pasting SVG into a component.
import arrowDownOnSquare from 'heroicons/24/outline/arrow-down-on-square.svg?raw';
import arrowDownTray from 'heroicons/24/outline/arrow-down-tray.svg?raw';
import arrowLeft from 'heroicons/24/outline/arrow-left.svg?raw';
import arrowPath from 'heroicons/24/outline/arrow-path.svg?raw';
import arrowTopRightOnSquare from 'heroicons/24/outline/arrow-top-right-on-square.svg?raw';
import arrowUp from 'heroicons/24/outline/arrow-up.svg?raw';
import arrowsRightLeft from 'heroicons/24/outline/arrows-right-left.svg?raw';
import beaker from 'heroicons/24/outline/beaker.svg?raw';
import bookOpen from 'heroicons/24/outline/book-open.svg?raw';
import chevronDown from 'heroicons/24/outline/chevron-down.svg?raw';
import chevronLeft from 'heroicons/24/outline/chevron-left.svg?raw';
import chevronRight from 'heroicons/24/outline/chevron-right.svg?raw';
import clock from 'heroicons/24/outline/clock.svg?raw';
import codeBracket from 'heroicons/24/outline/code-bracket.svg?raw';
import commandLine from 'heroicons/24/outline/command-line.svg?raw';
import computerDesktop from 'heroicons/24/outline/computer-desktop.svg?raw';
import cube from 'heroicons/24/outline/cube.svg?raw';
import cubeTransparent from 'heroicons/24/outline/cube-transparent.svg?raw';
import devicePhoneMobile from 'heroicons/24/outline/device-phone-mobile.svg?raw';
import documentText from 'heroicons/24/outline/document-text.svg?raw';
import envelope from 'heroicons/24/outline/envelope.svg?raw';
import exclamationCircle from 'heroicons/24/outline/exclamation-circle.svg?raw';
import funnel from 'heroicons/24/outline/funnel.svg?raw';
import globeAlt from 'heroicons/24/outline/globe-alt.svg?raw';
import language from 'heroicons/24/outline/language.svg?raw';
import link from 'heroicons/24/outline/link.svg?raw';
import magnifyingGlassPlus from 'heroicons/24/outline/magnifying-glass-plus.svg?raw';
import moon from 'heroicons/24/outline/moon.svg?raw';
import play from 'heroicons/24/outline/play.svg?raw';
import printer from 'heroicons/24/outline/printer.svg?raw';
import rocketLaunch from 'heroicons/24/outline/rocket-launch.svg?raw';
import serverStack from 'heroicons/24/outline/server-stack.svg?raw';
import shieldCheck from 'heroicons/24/outline/shield-check.svg?raw';
import sparkles from 'heroicons/24/outline/sparkles.svg?raw';
import squares2x2 from 'heroicons/24/outline/squares-2x2.svg?raw';
import sun from 'heroicons/24/outline/sun.svg?raw';
import tag from 'heroicons/24/outline/tag.svg?raw';
import xMark from 'heroicons/24/outline/x-mark.svg?raw';

export const icons = {
	'arrow-down-on-square': arrowDownOnSquare,
	'arrow-down-tray': arrowDownTray,
	'arrow-left': arrowLeft,
	'arrow-path': arrowPath,
	'arrow-top-right-on-square': arrowTopRightOnSquare,
	'arrow-up': arrowUp,
	'arrows-right-left': arrowsRightLeft,
	beaker: beaker,
	'book-open': bookOpen,
	'chevron-down': chevronDown,
	'chevron-left': chevronLeft,
	'chevron-right': chevronRight,
	clock: clock,
	'code-bracket': codeBracket,
	'command-line': commandLine,
	'computer-desktop': computerDesktop,
	cube: cube,
	'cube-transparent': cubeTransparent,
	'device-phone-mobile': devicePhoneMobile,
	'document-text': documentText,
	envelope: envelope,
	'exclamation-circle': exclamationCircle,
	funnel: funnel,
	'globe-alt': globeAlt,
	language: language,
	link: link,
	'magnifying-glass-plus': magnifyingGlassPlus,
	moon: moon,
	play: play,
	printer: printer,
	'rocket-launch': rocketLaunch,
	'server-stack': serverStack,
	'shield-check': shieldCheck,
	sparkles: sparkles,
	'squares-2x2': squares2x2,
	sun: sun,
	tag: tag,
	'x-mark': xMark
};

export type IconName = keyof typeof icons;
