"use client";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Project } from "@/hooks/useProjects";
import type { ChipProps } from "@mui/material/Chip";

interface ProjectCardProps {
  project: Project;
  onClick?: (project: Project) => void;
}

export default function ProjectCard({ project, onClick }: ProjectCardProps) {
  const getStageColor = (stage: Project["stage"]): { color: ChipProps["color"]; label: string } => {
    switch (stage) {
      case "アイデア段階":
        return { color: "primary", label: "アイデア段階" };
      case "検証中":
        return { color: "warning", label: "検証中" };
      case "開発中":
        return { color: "success", label: "開発中" };
      case "完了":
        return { color: "default", label: "完了" };
      default:
        return { color: "default", label: stage };
    }
  };
  const stage = getStageColor(project.stage);

  return (
    <Card
      sx={{
        cursor: "pointer",
        transition: "box-shadow 0.2s, transform 0.2s",
        '&:hover': { boxShadow: 6, transform: 'translateY(-4px)' },
        border: 1,
        borderColor: 'grey.200',
        minHeight: 220,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
      onClick={() => onClick?.(project)}
    >
      <CardHeader
        sx={{ pb: 1, pt: 2 }}
        title={
          <Box display="flex" alignItems="center" gap={1}>
            <Box fontSize={28}>{project.icon}</Box>
            <Typography variant="subtitle1" fontWeight={700} noWrap maxWidth={180}>
              {project.title}
            </Typography>
          </Box>
        }
        action={
          <Chip
            label={stage.label}
            color={stage.color}
            size="small"
            sx={{ fontWeight: 700 }}
          />
        }
      />
      <CardContent sx={{ pt: 0 }}>
        <Box display="flex" justifyContent="space-between" color="text.secondary" fontSize={13} mb={1}>
          <span>最終更新: {project.lastUpdated}</span>
          <span>検証進捗: {project.progress}%</span>
        </Box>
        <LinearProgress
          variant="determinate"
          value={project.progress}
          sx={{ height: 8, borderRadius: 4, mb: 2, background: '#eee' }}
        />
        <Grid container spacing={1}>
          <Grid item={true} xs={4}>
            <Button variant="outlined" size="small" fullWidth onClick={e => { e.stopPropagation(); }}>
              Canvas
            </Button>
          </Grid>
          <Grid item={true} xs={4}>
            <Button variant="outlined" size="small" fullWidth onClick={e => { e.stopPropagation(); }}>
              検証
            </Button>
          </Grid>
          <Grid item={true} xs={4}>
            <Button variant="outlined" size="small" fullWidth onClick={e => { e.stopPropagation(); }}>
              ゲート
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
} 