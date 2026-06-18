import { useEffect, useMemo, useState } from "react"
import { motion } from "framer-motion"
import { MoveRight } from "lucide-react"
import { Button } from "@/components/ui/button"

function AnimatedHero({ lang, onNavigate }) {
  const [titleNumber, setTitleNumber] = useState(0)
  
  const titles = useMemo(() => {
    if (lang === 'id') {
      return ["Berkinerja Tinggi", "Skalabel", "Cerdas & AI", "Premium", "Responsif"]
    }
    return ["High-Performance", "Scalable", "Intelligent & AI", "Premium", "Responsive"]
  }, [lang])

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (titleNumber === titles.length - 1) {
        setTitleNumber(0)
      } else {
        setTitleNumber(titleNumber + 1)
      }
    }, 2500)
    return () => clearTimeout(timeoutId)
  }, [titleNumber, titles])

  const handleClick = (e, targetId) => {
    e.preventDefault()
    if (onNavigate) {
      onNavigate(targetId)
    }
  }

  return (
    <div className="w-full relative z-10 py-16 lg:py-28">
      <div className="container mx-auto px-4">
        <div className="flex gap-8 items-center justify-center flex-col text-center">
          <div>
            <Button 
              variant="secondary" 
              size="sm" 
              className="gap-2 border border-border bg-charcoal-dark/50 text-[#c5a880] hover:text-[#d5b890] hover:bg-charcoal-dark backdrop-blur-md transition-all duration-300 rounded-full"
              onClick={(e) => handleClick(e, '#about')}
            >
              {lang === 'id' ? 'Pelajari tentang saya' : 'Learn more about me'} <MoveRight className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="flex gap-6 flex-col max-w-4xl">
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tight text-foreground leading-[1.15] font-heading min-h-[160px] md:min-h-[220px] flex flex-col justify-center items-center">
              <span>
                {lang === 'id' ? "Membangun Ekosistem Digital" : "Crafting Digital Ecosystems"}
              </span>
              <span className="relative flex w-full justify-center overflow-hidden text-center h-[45px] sm:h-[65px] md:h-[85px] pt-1">
                &nbsp;
                {titles.map((title, index) => (
                  <motion.span
                    key={index}
                    className="absolute font-semibold text-[#c5a880] whitespace-nowrap text-3xl sm:text-5xl md:text-6xl lg:text-7xl"
                    initial={{ opacity: 0, y: "-100%" }}
                    transition={{ type: "spring", stiffness: 45, damping: 15 }}
                    animate={
                      titleNumber === index
                        ? {
                            y: 0,
                            opacity: 1,
                          }
                        : {
                            y: titleNumber > index ? "-150%" : "150%",
                            opacity: 0,
                          }
                    }
                  >
                    {title}
                  </motion.span>
                ))}
              </span>
            </h1>

            <p className="text-base md:text-lg leading-relaxed text-[#8888aa] max-w-2xl mx-auto font-body">
              {lang === 'id' 
                ? "Mahasiswa Informatika yang berspesialisasi dalam membangun Aplikasi Mobile Flutter berpresisi tinggi, Aplikasi Web React yang performan, serta integrasi model Machine Learning tingkat lanjut."
                : "Informatics scholar specializing in high-fidelity Flutter Mobile Apps, performant React Web Applications, and advanced Machine Learning integrations."}
            </p>
          </div>
          
          <div className="flex flex-row gap-4 mt-4">
            <Button 
              size="lg" 
              variant="outline" 
              className="gap-2 border-border text-foreground hover:bg-[#c5a880]/10 rounded-full font-body"
              onClick={(e) => handleClick(e, '#projects')}
            >
              {lang === 'id' ? 'Lihat Proyek' : 'View Projects'}
            </Button>
            <Button 
              size="lg" 
              className="gap-2 bg-[#c5a880] text-black hover:bg-[#d5b890] transition-colors rounded-full font-bold font-body"
              onClick={(e) => handleClick(e, '#contact')}
            >
              {lang === 'id' ? 'Hubungi Saya' : 'Let\'s Connect'} <MoveRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export { AnimatedHero }
