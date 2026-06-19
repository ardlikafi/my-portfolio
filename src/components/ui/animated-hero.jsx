import { useEffect, useMemo, useState } from "react"
import { motion } from "framer-motion"
import { MoveRight } from "lucide-react"
import { Button } from "./button"
import ThreeDObject from "../ThreeDObject"

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
    <div className="w-full relative z-10 py-12 lg:py-20 border-b border-white/5">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Kolom Kiri: Teks & Aksi */}
          <div className="lg:col-span-7 flex flex-col gap-6 text-left items-start">
            <div>
              <Button 
                variant="secondary" 
                size="sm" 
                className="gap-2 border border-border bg-charcoal-dark/50 text-[#c5a880] hover:text-[#d5b890] hover:bg-charcoal-dark backdrop-blur-md transition-all duration-300 rounded-full cursor-pointer"
                onClick={(e) => handleClick(e, '#about')}
              >
                {lang === 'id' ? 'Pelajari tentang saya' : 'Learn more about me'} <MoveRight className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="flex gap-6 flex-col w-full">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-light tracking-tight text-foreground leading-[1.15] font-heading min-h-[140px] md:min-h-[180px] flex flex-col justify-center items-start">
                <span>
                  {lang === 'id' ? "Membangun Ekosistem Digital" : "Crafting Digital Ecosystems"}
                </span>
                <span className="relative flex w-full justify-start overflow-hidden text-left h-[45px] sm:h-[65px] md:h-[80px] pt-1">
                  &nbsp;
                  {titles.map((title, index) => (
                    <motion.span
                      key={index}
                      className="absolute font-semibold text-[#c5a880] whitespace-nowrap text-3xl sm:text-5xl md:text-6xl"
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

              <p className="text-sm sm:text-base md:text-lg leading-relaxed text-[#8888aa] max-w-xl font-body">
                {lang === 'id' 
                  ? "Mahasiswa Informatika yang berspesialisasi dalam membangun Aplikasi Mobile Flutter berpresisi tinggi, Aplikasi Web React yang performan, serta integrasi model Machine Learning tingkat lanjut."
                  : "Informatics scholar specializing in high-fidelity Flutter Mobile Apps, performant React Web Applications, and advanced Machine Learning integrations."}
              </p>
            </div>
            
            <div className="flex flex-row gap-4 mt-2">
              <Button 
                size="lg" 
                variant="outline" 
                className="gap-2 border-border text-foreground hover:bg-[#c5a880]/10 rounded-full font-body cursor-pointer"
                onClick={(e) => handleClick(e, '#projects')}
              >
                {lang === 'id' ? 'Lihat Proyek' : 'View Projects'}
              </Button>
              <Button 
                size="lg" 
                className="gap-2 bg-[#c5a880] text-black hover:bg-[#d5b890] transition-colors rounded-full font-bold font-body cursor-pointer"
                onClick={(e) => handleClick(e, '#contact')}
              >
                {lang === 'id' ? 'Hubungi Saya' : 'Let\'s Connect'} <MoveRight className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Kolom Kanan: 3D Canvas Interactive Object */}
          <div className="lg:col-span-5 w-full h-[400px] flex items-center justify-center relative">
            {/* Soft decorative backlights behind the 3D canvas */}
            <div className="absolute w-[280px] h-[280px] bg-[#c5a880]/10 rounded-full blur-[100px] -z-10 pointer-events-none" />
            <ThreeDObject />
          </div>

        </div>
      </div>
    </div>
  )
}

export { AnimatedHero }
export default AnimatedHero
