<List
  sx={{
    width: "100%",
    maxWidth: 360,
    bgcolor: "background.paper",
    borderRadius: "2rem",
    marginTop: "1rem",
  }}
>
  <div>
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <Link to="/profile">
          <Avatar alt="" src={usersall.pic} />
        </Link>
      </ListItemAvatar>
      <ListItemText primary={usersall.name} />
    </ListItem>
    <Divider variant="inset" component="li" sx={{ width: "70%" }} />
  </div>
</List>
