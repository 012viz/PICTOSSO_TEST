"use client"
import { useState, useEffect, useCallback, memo, useRef } from "react";
import LazyLoad from 'react-lazyload';
import { Icon } from '@iconify/react';
import debounce from 'lodash.debounce';
import { unstable_batchedUpdates } from 'react-dom';
import { IIcon } from "@/types";
import { capitalized } from "@/utils";

export { Icon } from "@iconify/react/dist/offline";
interface EmojiCategoriesProps {
  emojis: { [key: string]: string[] };
  selectedCategory: string | null;
  setSelectedCategory: Function;
}

const sanitizeClassName = (name: string | null) => name && name.replace(/[^a-zA-Z0-9-_]/g, '_');

// TODO: horizontal scroll not working on Alex's computer 
const EmojiCategories: React.FC<EmojiCategoriesProps> = ({
  emojis,
  selectedCategory,
  setSelectedCategory,
}) => {
  const [indicatorStyle, setIndicatorStyle] = useState<React.CSSProperties>({});
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);


  const checkScroll = useCallback(() => {
    setTimeout(() => {
      if (containerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
        // console.log("SCROLLl", scrollLeft, clientWidth, scrollWidth, scrollLeft + clientWidth <= scrollWidth)
        setShowLeftArrow(scrollLeft > 0);
        setShowRightArrow(scrollLeft + clientWidth <= scrollWidth);
      }
    }, 50)
  }, []);

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    window.addEventListener('focus', checkScroll);
    return () => {
      window.removeEventListener('resize', checkScroll);
      window.removeEventListener('focus', checkScroll);
    };
  }, [checkScroll]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener('scroll', checkScroll);
    return () => container.removeEventListener('scroll', checkScroll);
  }, [checkScroll]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const selectedElement = container.querySelector<HTMLParagraphElement>(
      `.category-${sanitizeClassName(selectedCategory)}`
    );
    if (selectedElement) {
      const { offsetLeft, offsetWidth } = selectedElement;
      setIndicatorStyle({
        left: offsetLeft,
        width: offsetWidth,
      });
    }
  }, [selectedCategory]);

  const scroll = (direction: 'left' | 'right') => {
    if (!containerRef.current) return;
    const scrollAmount = 200;
    containerRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  };

  return (
    <div className="flex w-full gap-0 py-8 sticky top-0 bg-white">
      {showLeftArrow && (
        <button
          onClick={() => scroll('left')}
          className="px-2 bg-white flex items-center hover:bg-gray-50"
          aria-label="Scroll left"
        >
          <Icon icon="material-symbols:chevron-left" width="20" height="20" />
        </button>
      )}
      <div
        className="flex w-full overflow-x-auto no-scrollbar relative px-8"
        ref={containerRef}
      >
        {Object.keys(emojis).map((cat) => {
          const sanitizedCat = sanitizeClassName(cat);
          return (
            <p
              key={cat}
              className={`cursor-pointer flex-grow-0 flex-shrink-0 text-[13px] font-medium py-4 px-4 text-left category-${sanitizedCat} ${cat === selectedCategory ? "text-black" : "text-[#626264]"
                }`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </p>
          );
        })}
        <div
          className="absolute bottom-0 h-0.5 bg-black transition-all duration-300"
          style={indicatorStyle}
        />
      </div>
      {showRightArrow && (
        <button
          onClick={() => scroll('right')}
          className="px-2 bg-white flex items-center hover:bg-gray-50"
          aria-label="Scroll right"
        >
          <Icon icon="material-symbols:chevron-right" width="20" height="20" />
        </button>
      )}
    </div>
  );
};

const Emoji = (props: { preSelectedIcon?: IIcon, onIconPicked: (icon: IIcon) => void }) => {
  const [emojis, setEmojis] = useState<{ [key: string]: string[] }>({});
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedEmoji, setSelectedEmoji] = useState<string | null>(props?.preSelectedIcon?.name || null);

  useEffect(() => {
    const fetchEmojis = async () => {
      try {
        const [notoResponse, flagsResponse] = await Promise.all([
          fetch('https://api.iconify.design/collection?prefix=noto&pretty=1'),
          fetch('https://api.iconify.design/collection?prefix=circle-flags&pretty=1')
        ]);
        const notoData = await notoResponse.json();
        const flagsData = await flagsResponse.json();
        unstable_batchedUpdates(() => {
          const flagsKeys = Object.fromEntries(
            Object.entries(notoData.categories).map(([key, values]) => [
              key,
              (values as string[]).map((emoji: string) => `noto:${emoji}`)
            ])
          )
          console.log("flagsKeys", flagsKeys)
          setEmojis({
            ...flagsKeys,
            Flags: [...(flagsKeys?.Flags||[]), ...flagsData.uncategorized.map((emoji: string) => `circle-flags:${emoji}`)]
          });
          setSelectedCategory(Object.keys(notoData.categories)[0]);
        });
      } catch (error) {
        console.error("Failed to fetch emojis:", error);
      }
    };
    fetchEmojis();
  }, []);

  const handleIconClick = useCallback(debounce((id: string) => {
    const selectedIcon: IIcon = {
      id: id,
      size: 1,
      name: id,
      path: id,
      color: 'unset',
      source: "iconify"
    };
    unstable_batchedUpdates(() => {
      setSelectedEmoji(id);
      props.onIconPicked(selectedIcon);
    });
  }, 30), [props]);

  return (
    <div className="px-12 pb-48 flex flex-col h-full overflow-auto" id="emoji-container">

      <EmojiCategories emojis={emojis} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />

      <div className="flex flex-wrap px-2 gap-4 justify-between">
        {selectedCategory && emojis[selectedCategory].map(emoji => {
          const id = `${emoji}`;
          const selected = id === selectedEmoji;
          return (
            <div
              key={id}
              data-tooltip-id="tooltip" data-tooltip-content={emoji.split(":")[1].split('-').map(t => capitalized(t)).join(' ')}
              className={`w-14 h-14 flex items-center justify-center rounded-2xl ${selected ? 'shadow-[0_1px_1px_0_rgba(0,0,0,0.8)] bg-gradient-to-r from-[rgba(212,0,255,0.8)] to-[rgba(128,0,255,0.8)]' : 'shadow-[0_1px_1px_0_rgba(0,0,0,0.1),0_1px_2px_0_rgba(0,0,0,0.15)]'}`}
            >
              <LazyLoad height={40} offset={100} scrollContainer="#emoji-container" once>
                <Icon
                  key={`icon_${id}`}
                  className="cursor-pointer"
                  width={40}
                  icon={id}
                  onClick={() => handleIconClick(id)}
                />
              </LazyLoad>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default memo(Emoji);
