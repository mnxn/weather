import { Box, Divider, Stack, Tooltip } from "@mui/material";
import { blue, red } from "@mui/material/colors";

export default function HighLowTemps({
  high,
  low,
}: {
  high: number;
  low: number;
}) {
  return (
    <Stack direction="row" gap={1.5} alignItems="center">
      <Tooltip title="High Temperature">
        <Box fontWeight="bold" color={red[700]}>
          {high}&deg;
        </Box>
      </Tooltip>
      <Divider orientation="vertical" flexItem />
      <Tooltip title="Low Temperature">
        <Box fontWeight="bold" color={blue[700]}>
          {low}&deg;
        </Box>
      </Tooltip>
    </Stack>
  );
}
