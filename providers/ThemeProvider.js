import { useState, useContext, useMemo, useCallback } from "react"
import { ThemeContext, themes } from "context/ThemeContext"

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(themes.dark)

  const toggleTheme = useCallback(() => {
    setTheme(theme === themes.dark ? themes.light : themes.dark)
  }, [theme])

  const themeAPI = useMemo(() => {
    return {
      theme,
      toggleTheme
    }
  }, [theme, toggleTheme])

  return (
    <ThemeContext.Provider value={themeAPI}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)

export default ThemeProvider