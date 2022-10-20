import { Dialog, DialogContent, DialogTitle, Grid, styled } from '@mui/material'
import { gapi } from 'gapi-script'
import React, { useState } from 'react'
import GoogleButton from 'react-google-button'
import { GoogleLogin } from 'react-google-login'

import { SearchContainer, StyledInputBase } from '@/components'
import { loginWithGG } from '@/libs/apis'
import { backgroundColor, WhiteTypograpy } from '@/styles'
type LoginDialogProps = {
  open: boolean
  handleClose: () => void
}
export const LoginDialog = ({ open, handleClose }: LoginDialogProps) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value)
    console.log('value', e.target.value)
  }
  const onSuccess = async (res: any) => {
    console.log('data payload', res)
    const login = await loginWithGG('login-with-google', res?.profileObj).then((res) => {
      //   setUser(res.data.data)
      localStorage.setItem('user-token', res.data.access_token)
    })
    handleClose()
    // saveUserLocalStorage(res.profileObj)
  }
  const onFailure = (err: any) => {}

  React.useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: '892961628161-ttu2f42daldnurgoednpa6fss17u0pr4.apps.googleusercontent.com',
        scope: '',
      })
    }
    gapi.load('client:auth2', initClient)
  })
  return (
    <Dialog open={open} onClose={handleClose}>
      <CustomDialogTitle>
        <WhiteTypograpy>Đăng nhập </WhiteTypograpy>
      </CustomDialogTitle>
      <DialogContent>
        <Grid container>
          <Grid item xs={12}>
            <SearchContainer>
              <StyledInputBase
                placeholder="Tài khoản"
                onChange={handleUsernameChange}
                value={username}
              />
            </SearchContainer>
          </Grid>
          <Grid item xs={12}>
            <SearchContainer>
              <StyledInputBase
                placeholder="Tài khoản"
                onChange={handleUsernameChange}
                value={username}
              />
            </SearchContainer>
          </Grid>
          <Grid item xs={6}>
            {/* <BootstrapButton sx={{ margin: 0 }}>
                <AlibabaText>
                </AlibabaText>
              </BootstrapButton> */}
            <GoogleLogin
              clientId="892961628161-ttu2f42daldnurgoednpa6fss17u0pr4.apps.googleusercontent.com"
              buttonText="Sign in with Google"
              onSuccess={onSuccess}
              onFailure={onFailure}
              cookiePolicy={'single_host_origin'}
              // isSignedIn={true}
              render={(renderProps) => (
                <GoogleButton
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                  style={{ width: '100%' }}
                >
                  Sign in with Google
                </GoogleButton>
              )}
            />
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  )
}

const CustomDialogTitle = styled(DialogTitle)({
  backgroundColor: backgroundColor['primary'],
})
