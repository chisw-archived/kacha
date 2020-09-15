import React, { useCallback, useState } from 'react'
import Icons from '../images/icons'
import { DEFAULT_WATERMARK_LIST } from '../ts/constant'
import { Button } from 'carbon-components-react'
import EditorDialog from './EditorDialog'

const HOVER_CLASS = 'hover:bg-white-100 transition-all duration-300 active:duration-75 active:bg-transparent cursor-pointer'

export default function WatermarkList() {

  const [activeWatermarkId, setActiveWatermarkId] = useState('')
  const [editorOpen, setEditorOpen] = useState(false)

  const handleEditorClose = useCallback(() => {
    setEditorOpen(false)
  }, [])

  const handleWatermarkEdit = useCallback((watermarkId: string) => {
    setActiveWatermarkId(watermarkId)
    setEditorOpen(true)
  }, [])

  return (
    <>
      <div className="container mx-auto mt-12 flex-grow">
        <div className="flex flex-wrap -mx-4">
          {DEFAULT_WATERMARK_LIST.map((watermark, index) => {
            const { id, type, src } = watermark
            return (
              <div
                key={index}
                className="mb-4 px-4 w-1/2 md:w-1/3 lg:w-1/5 select-none"
              >
                <div className="watermark-wrapper relative h-40 bg-grid overflow-hidden shadow-lg">
                  <div>
                    {type === 'text' ? (
                      <span className="text-white">{src}</span>
                    ) : (
                      <img src={src} alt="img" />
                    )}
                  </div>
                  <div className="absolute inset-0 opacity-0 hover:opacity-100 flex flex-col bg-black-500 bg-hazy-25 transition-all duration-200 border border-solid border-gray-800">
                    <div
                      className={`flex-grow flex justify-center items-center ${HOVER_CLASS} text-white text-sm border-b border-solid border-gray-800`}
                      onClick={() => {}}
                    >
                      <span className="flex items-center">
                        <Icons.Tick size={20} />
                        <span className="ml-1">使用该水印</span>
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <div
                        className={`py-2 flex-grow flex justify-center ${HOVER_CLASS} text-white border-r border-solid border-gray-800`}
                        onClick={() => handleWatermarkEdit(id)}
                      >
                        <Icons.Edit />
                      </div>
                      <div
                        className={`py-2 flex-grow flex justify-center ${HOVER_CLASS} text-white border-r border-solid border-gray-800`}
                        onClick={() => {}}
                      >
                        <Icons.Duplicate />
                      </div>
                      <div
                        className={`py-2 flex-grow flex justify-center ${HOVER_CLASS} text-red-600`}
                        onClick={() => {}}
                      >
                        <Icons.Delete />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
          <div className="mb-8 px-4 w-1/2 md:w-1/3 lg:w-1/5">
            <div
              className={`h-40 bg-gray-900 border-2 border-dashed flex justify-center items-center text-white text-6xl cursor-pointer
                opacity-25 hover:opacity-75 transition-all duration-200 bg-hazy-100 active:duration-75 active:opacity-25`}
            >
              <Icons.Plus size={48} />
            </div>
          </div>
          <div className="px-4 w-full pb-2">
            <Button small>导出水印</Button>
            <Button small kind="secondary">导入水印</Button>
          </div>
        </div>
      </div>
      <EditorDialog
        open={editorOpen}
        watermarkId={activeWatermarkId}
        onClose={handleEditorClose}
      />
    </>
  )
}