//components
import BurgerMenu from './components/organisms/BurgerMenu'
import Header from './components/Header'
import Binaries from './components/atoms/Binaries'
import { useEffect } from 'react'
import VideoList from './components/VideoList'
import MainSubmitForm from './components/MainSubmitForm'
//react
import { useState, useContext } from 'react'
//types
import type { FullReportData } from './types/mediaCompactedData'
import VideoArrayModal from './components/organisms/VideoArrayModal'
import ErrorsLogModal from './components/organisms/ErrorsModal'
import { GeneralUserDataContext } from './Contexts/GeneralUserDataContext'


function App(): React.ReactNode {
  const [fullReportData, setFullReportData] = useState<FullReportData>({
    MediaCompactedData: [],
    errors: []
  })
  const [isOpenVideoArrayModal, setIsOpenVideoArrayModal] = useState<boolean>(false)
  const [isOpenErrorsLogModal, setIsOpenErrorsLogModal] = useState<boolean>(false)
  const { setSettings } = useContext(GeneralUserDataContext)
  useEffect(() => {

    const getData = async (): Promise<void> => {

      const data = await window.api.getConfigData()
      setSettings(data)
    }

    getData()
  }, [])
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <Header />
      <Binaries
        setFullReportData={setFullReportData}
        setIsOpenErrorsLogModal={setIsOpenErrorsLogModal}
      />
      <BurgerMenu
        setFullReportData={setFullReportData}
        fullReportData={fullReportData}
      />
      <ErrorsLogModal
        isOpenErrorsLogModal={isOpenErrorsLogModal}
        setIsOpenErrorsLogModal={setIsOpenErrorsLogModal}
        errors={fullReportData.errors}
      />
      <MainSubmitForm
        setIsOpenVideoArrayModal={setIsOpenVideoArrayModal}
        setVideos={setFullReportData}
      />
      <VideoArrayModal
        setIsOpenVideoArrayModal={setIsOpenVideoArrayModal}
        isOpenVideoArrayModal={isOpenVideoArrayModal}
      />
      <VideoList videos={fullReportData.MediaCompactedData} />
    </div>
  )
}

export default App
