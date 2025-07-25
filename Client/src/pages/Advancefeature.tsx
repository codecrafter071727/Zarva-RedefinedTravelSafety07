import { useState } from 'react';
import { Camera, Mic, MapPin } from 'lucide-react';

const AdvancedFeatures = () => {
  const [flippedCards, setFlippedCards] = useState<{ [key: number]: boolean }>({});
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  
  const backgroundImage = '/background.z.jpg'; // Add your background image URL here
  const customIcons = [
    "cctv.svg",
    "mic.svg", 
    "map.svg",
  ];

  const toggleCard = (cardIndex: number) => {
    setFlippedCards((prev: { [key: number]: boolean }) => ({
      ...prev,
      [cardIndex]: !prev[cardIndex],
    }));
  };

  const cardData = [
    {
      title: "Safer Cabs",
      icon: Camera,
      frontContent: "Safer Cabs",
      backContent: "Every cab at Zarva is equipped with cameras, ensuring an added layer of security for both the party and driver. Real-time monitoring and recording capabilities provide peace of mind throughout your journey."
    },
    {
      title: "Speech Recognition", 
      icon: Mic,
      frontContent: "Speech Recognition",
      backContent: "If you ever feel unsafe, say a pre-set word three times which triggers immediate alerts. If we can't reach you, our system will automatically call your emergency contacts for immediate assistance."
    },
    {
      title: "Safer Routes",
      icon: MapPin, 
      frontContent: "Safer Routes",
      backContent: "Our intelligent navigation system smartly avoids high-risk areas, ensuring you travel through the safest and most efficient paths. Real-time route optimization for maximum security."
    }
  ];

  const defaultIcon = (IconComponent: React.ElementType, index: number) => {
    if (customIcons[index]) {
      return <img src={customIcons[index]} alt="Custom icon" className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 object-contain transition-all duration-300 group-hover:scale-110 group-hover:brightness-110" />;
    }
    return <IconComponent size={40} className="sm:w-12 sm:h-12 md:w-14 md:h-14 transition-all duration-300 group-hover:scale-110" style={{ color: '#BCB291' }} />;
  };

  return (
    <div 
      className="min-h-screen p-4 sm:p-6 md:p-8 relative"
      style={{
        backgroundColor: '#2a2a2a',
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : `
          linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%),
          linear-gradient(0deg, 
            #5a5240 0%, 
            #7a6d55 15%, 
            #BCB291 30%, 
            #5a4f3d 45%, 
            rgba(42, 42, 42, 0.8) 60%, 
            rgba(42, 42, 42, 0.4) 80%, 
            transparent 100%
          )
        `,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Main Content */}
      <div className="relative z-10">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-8 sm:mb-12 md:mb-16 lg:mb-20 animate-pulse" style={{ 
          color: 'black',
          fontFamily: 'serif',
          letterSpacing: '0.02em',
          animation: 'fadeInDown 1s ease-out'
        }}>
          Advanced Features
        </h1>

        {/* Improved card grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10 max-w-7xl mx-auto px-4">
          {cardData.map((card, index) => (
            <div
              key={index}
              className="group relative w-full h-80 sm:h-96 md:h-[420px] cursor-pointer transition-all duration-500 ease-out hover:scale-105"
              onClick={() => toggleCard(index)}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{
                filter: hoveredCard !== null && hoveredCard !== index ? 'brightness(0.7) blur(1px)' : 'brightness(1) blur(0px)',
                transform: hoveredCard === index ? 'translateY(-10px) scale(1.05)' : 'translateY(0px) scale(1)',
                transition: 'all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              }}
            >
              <div 
                className={`absolute inset-0 w-full h-full transition-all duration-700 transform-style-preserve-3d ${
                  flippedCards[index] ? 'rotate-y-180' : ''
                }`}
                style={{ 
                  transformStyle: 'preserve-3d',
                  boxShadow: hoveredCard === index 
                    ? '0 25px 50px rgba(188, 178, 145, 0.3), 0 0 30px rgba(188, 178, 145, 0.2)' 
                    : '0 10px 25px rgba(0, 0, 0, 0.3)'
                }}
              >
                {/* Front of card */}
                <div 
                  className="absolute inset-0 w-full h-full rounded-2xl sm:rounded-3xl flex flex-col items-center justify-center p-6 sm:p-8 text-center backface-hidden shadow-2xl transition-all duration-500"
                  style={{ 
                    background: hoveredCard === index 
                      ? `linear-gradient(180deg, 
                          #1a1a1a 0%, 
                          #2a2a2a 50%, 
                          #6a6a6a 80%, 
                          #909090 100%),
                          linear-gradient(135deg, 
                          #aaa 0%, 
                          #777 15%, 
                          #1a1a1a 40%)`
                      : `linear-gradient(180deg, 
                          #000000 0%, 
                          #000000 50%, 
                          #5a5a5a 80%, 
                          #808080 100%),
                          linear-gradient(135deg, 
                          #999999 0%, 
                          #666666 15%, 
                          #000000 40%)`,
                    border: hoveredCard === index ? '2px solid #BCB291' : '1px solid #BCB291',
                    backfaceVisibility: 'hidden',
                    borderRadius: '16px',
                  }}
                >
                  <div className="mb-6 sm:mb-8 transition-all duration-300 group-hover:animate-bounce">
                    {defaultIcon(card.icon, index)}
                  </div>
                  <h3 
                    className="text-xl sm:text-2xl md:text-3xl font-light leading-tight transition-all duration-300 group-hover:text-white mb-4" 
                    style={{ 
                      color: hoveredCard === index ? '#ffffff' : '#BCB291',
                      fontFamily: 'Playfair display',
                      letterSpacing: '0.02em',
                      fontSize: 'clamp(1.25rem, 3vw, 2.5rem)',
                      textShadow: hoveredCard === index ? '0 0 20px rgba(188, 178, 145, 0.5)' : 'none'
                    }}
                  >
                    {card.frontContent}
                  </h3>
                  
                  {/* Hover indicator */}
                  <div 
                    className="absolute bottom-4 left-1/2 transform -translate-x-1/2 transition-all duration-300"
                    style={{
                      opacity: hoveredCard === index ? 1 : 0,
                      transform: `translateX(-50%) translateY(${hoveredCard === index ? '0' : '10px'})`,
                    }}
                  >
                    <div className="text-xs sm:text-sm text-white bg-black bg-opacity-50 px-3 py-2 rounded-full">
                      Click to flip
                    </div>
                  </div>
                </div>

                {/* Back of card */}
                <div 
                  className="absolute inset-0 w-full h-full rounded-2xl sm:rounded-3xl flex flex-col items-center justify-center p-6 sm:p-8 text-center backface-hidden rotate-y-180 shadow-2xl transition-all duration-500"
                  style={{ 
                    background: hoveredCard === index 
                      ? `linear-gradient(185deg, 
                          #1a1a1a 0%, 
                          #2a2a2a 50%, 
                          #6a6a6a 80%, 
                          #909090 100%)`
                      : `linear-gradient(185deg, 
                          #000000 0%, 
                          #000000 50%, 
                          #5a5a5a 80%, 
                          #808080 100%)`,
                    border: hoveredCard === index ? '2px solid #BCB291' : '1px solid #BCB291',
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                  }}
                >
                  <div className="flex-1 flex flex-col justify-center">
                    <p 
                      className="text-sm sm:text-base md:text-lg leading-relaxed mb-6 transition-all duration-300 overflow-hidden" 
                      style={{ 
                        color: hoveredCard === index ? '#ffffff' : '#BCB291',
                        fontFamily: 'sans-serif',
                        lineHeight: '1.6',
                        fontSize: 'clamp(0.875rem, 2vw, 1.125rem)',
                        display: '-webkit-box',
                        WebkitLineClamp: 6,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}
                    >
                      {card.backContent}
                    </p>
                  </div>
                  
                  <button 
                    className="px-6 sm:px-8 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-110 hover:shadow-lg text-sm sm:text-base mt-auto"
                    style={{ 
                      backgroundColor: hoveredCard === index ? '#ffffff' : '#BCB291',
                      color: hoveredCard === index ? '#2a2a2a' : '#2a2a2a',
                      fontFamily: 'sans-serif',
                      boxShadow: hoveredCard === index ? '0 5px 15px rgba(188, 178, 145, 0.4)' : 'none'
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (card.title === 'Safer Cabs') {
                        window.location.href = '/new';
                      } else if (card.title === 'Speech Recognition') {
                        window.location.href = '/speech';
                      } else if (card.title === 'Safer Routes') {
                        window.location.href = '/location';
                      }
                    }}
                  >
                    Explore
                  </button>
                </div>
              </div>
              
              {/* Glowing border effect on hover */}
              <div 
                className="absolute inset-0 rounded-2xl sm:rounded-3xl pointer-events-none transition-all duration-500"
                style={{
                  background: hoveredCard === index 
                    ? 'linear-gradient(45deg, transparent, rgba(188, 178, 145, 0.1), transparent)'
                    : 'transparent',
                  animation: hoveredCard === index ? 'pulse 2s infinite' : 'none'
                }}
              />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .transform-style-preserve-3d {
          transform-style: preserve-3d;
        }
        
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.6;
          }
        }
        
        @keyframes bounce {
          0%, 20%, 53%, 80%, 100% {
            transform: translate3d(0,0,0);
          }
          40%, 43% {
            transform: translate3d(0,-8px,0);
          }
          70% {
            transform: translate3d(0,-4px,0);
          }
          90% {
            transform: translate3d(0,-2px,0);
          }
        }
      `}</style>
    </div>
  );
};

export default AdvancedFeatures;