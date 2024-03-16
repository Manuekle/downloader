import { useEffect, useState } from "react"
import axios from "axios"
import Modal from "./modal"

function search() {
  const [link, setLink] = useState("") // link de la música
  const [song, setSong] = useState([])
  const [mp3, setMp3] = useState([])
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const postMusic = async () => {
    const data = new FormData()
    data.append("k_query", link)
    try {
      const response = await axios.post(
        "https://www.y2mate.com/mates/en931/analyzeV2/ajax",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      if (response.data.page === "detail") {
        setLoading(true)
        setTimeout(() => {
          setSong(response.data)
          setMp3(response.data.links.mp3.mp3128)
          setLoading(false)
        }, 2000)
      }
      if (response.data.page === "search") {
        setLoading(true)
        setTimeout(() => {
          setLoading(false)
        }, 2000)
      }
    } catch (error) {
      setLoading(false)
    }
  }
  const [texts, setTexts] = useState("")
  const [url, setUrl] = useState("")
  const [sizes, setSizes] = useState("")
  const [download, setDownload] = useState("")

  const info = () => {
    const d = mp3
    setTexts(d.q_text)
    setSizes(d.size)
    setDownload(d.k)
  }

  const startDownload = async (vid, k) => {
    const data = new FormData()
    data.append("vid", vid)
    data.append("k", k)
    try {
      const response = await axios
        .post("https://www.y2mate.com/mates/convertV2/index", data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(setOpen(true))
      const k = response.data.dlink
      const link = k.slice(0, -6)
      setUrl(link)
    } catch (error) {
      return error
    }
  }

  useEffect(() => {
    if (mp3) {
      info()
    }
  }, [mp3])

  return (
    <>
      <span className="flex flex-row gap-4 justify-stretch">
        <input
          type="text"
          id="search"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          className="w-full p-2 rounded-md focus:outline-none bg-zinc-100 text-zinc-800"
          placeholder="Ingrese el link de youtube"
        />
        <button
          type="button"
          onClick={postMusic}
          className="font-bold text-sm text-zinc-100 px-3 flex justify-center items-center bg-red-600 hover:bg-red-500 focus:bg-red-500 transition-colors rounded-md"
        >
          buscar
        </button>
      </span>

      {loading ? (
        <span className="h-96 flex justify-center items-center">
          <h1 className="text-zinc-200 font-bold text-xl text-center">
            Buscando...
          </h1>
        </span>
      ) : (
        <>
          {song.page === "detail" ? (
            <section>
              <figure className="flex justify-center py-8">
                <img
                  src={`https://i.ytimg.com/vi/${song.vid}/0.jpg`}
                  alt={song.title}
                  className="w-auto h-96 object-contain rounded-xl bg-black "
                />
              </figure>
              <h2 className="text-zinc-200 text-lg text-center font-bold py-2">
                {song.title}
              </h2>
              <div className="flex flex-col gap-4 justify-center items-center py-6">
                <span className="text-zinc-200">Archivo: {texts}</span>
                <span className="text-zinc-200">Tamaño: {sizes}</span>
                <button
                  type="button"
                  onClick={() => startDownload(song.vid, download)}
                  className="text-sm text-zinc-100 rounded-md font-bold bg-red-600 px-4 py-2"
                >
                  convertir
                </button>
                <Modal open={open} onClose={() => setOpen(false)}>
                  <div className="text-center w-56">
                    <div className="mx-auto my-4 w-48">
                      <h3 className="text-lg font-black text-gray-800">
                        Descargar
                      </h3>
                      <p className="text-sm text-gray-500">
                        Se ha generado el link de descarga
                      </p>
                    </div>
                    <a
                      href={url}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => setOpen(false)}
                      className="rounded-md text-sm text-zinc-100 font-bold bg-red-600 px-4 py-2"
                    >
                      Descargar .mp3
                    </a>
                  </div>
                </Modal>
              </div>
            </section>
          ) : null}
        </>
      )}
    </>
  )
}

export default search
