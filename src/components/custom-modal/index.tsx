/*
 * @Author: liqiu qiuli@sohu-inc.com
 * @Date: 2024-07-29 09:57:22
 * @LastEditors: liqiu qiuli@sohu-inc.com
 * @LastEditTime: 2024-07-29 16:16:08
 * @FilePath: /ai-writer-miniprogram/src/components/custom-modal/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from 'react'
import { createRoot } from "react-dom/client";
import { View, Button } from '@tarojs/components'
import { AtButton } from 'taro-ui';
import { ITouchEvent } from '@tarojs/components/types/common'
import './index.scss'

interface CustomButtonProps {
  text: string
  onClick: (event: ITouchEvent) => void
}

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  content: string
  onConfirm: () => void
  confirmText?: string
  customButtons?: CustomButtonProps[]
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  content,
  onConfirm,
  confirmText = '确定',
  customButtons = []
}) => {
  if (!isOpen) return null

  return (
    <View className='modal-container'>
      <View className='modal-mask' onClick={onClose} />
      <View className='modal-content'>
        <View className='modal-header'>
          {title}
        </View>
        <View className='modal-body'>
          {content}
        </View>
        <View className='modal-footer'>
          {customButtons.length
            ? customButtons.map((button: {
                onClick: () => void,
                className: string,
                text: string
              }, index) => (
                <AtButton
                  {...button}
                  key={index}
                  onClick={button.onClick}
                  className={`modal-button custom-button ${button.className}`}
                >
                  {button.text}
                </AtButton>
          ))
          : (
            <>
              <AtButton onClick={onClose} className='modal-button cancel-button'>
                取消
              </AtButton>
              <AtButton onClick={onConfirm} className='modal-button confirm-button'>
                {confirmText}
              </AtButton>
            </>
          )
        }
        </View>
      </View>
    </View>
  )
}

export default Modal